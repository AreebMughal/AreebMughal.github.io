/**
 * Pulls contribution, language and activity data for GITHUB_USERNAME and writes
 * data/github-stats.json, which the GithubStats section imports at build time.
 *
 * Runs in CI with the workflow's GITHUB_TOKEN. Locally it needs a PAT with
 * `read:user` in GITHUB_TOKEN; without one it exits cleanly and leaves the
 * committed fallback JSON in place so the build never breaks.
 */
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const USERNAME = process.env.GITHUB_USERNAME || 'AreebMughal';
const TOKEN = process.env.GITHUB_TOKEN;
const OUT_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'github-stats.json');

const MAX_LANGUAGES = 6;
const MAX_ACTIVITY = 5;
const HEATMAP_WEEKS = 53;

const graphql = async (query, variables) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': USERNAME
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);

  const body = await res.json();
  if (body.errors) throw new Error(`GraphQL: ${body.errors.map((e) => e.message).join('; ')}`);

  return body.data;
};

const rest = async (endpoint) => {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': USERNAME
    }
  });

  if (!res.ok) throw new Error(`REST ${endpoint} ${res.status}: ${await res.text()}`);

  return res.json();
};

const PROFILE_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      name
      login
      createdAt
      followers { totalCount }
      contributionsCollection { contributionYears }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount
        nodes {
          name
          nameWithOwner
          url
          description
          pushedAt
          stargazerCount
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name color }
            }
          }
        }
      }
    }
  }
`;

const YEAR_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`;

/** Merged day map -> { current, longest }. Today with 0 contributions does not break a streak yet. */
const calculateStreaks = (days) => {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longest = 0;
  let running = 0;

  for (const day of sorted) {
    running = day.count > 0 ? running + 1 : 0;
    if (running > longest) longest = running;
  }

  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) {
      current++;
    } else if (i === sorted.length - 1) {
      // an empty today is still an open streak
      continue;
    } else {
      break;
    }
  }

  return { current, longest };
};

const buildLanguages = (repos) => {
  const totals = new Map();

  for (const repo of repos) {
    for (const edge of repo.languages?.edges ?? []) {
      const existing = totals.get(edge.node.name);
      totals.set(edge.node.name, {
        name: edge.node.name,
        color: edge.node.color || '#6dd5ed',
        size: (existing?.size ?? 0) + edge.size
      });
    }
  }

  const ranked = [...totals.values()].sort((a, b) => b.size - a.size);
  const grandTotal = ranked.reduce((sum, lang) => sum + lang.size, 0) || 1;
  const top = ranked.slice(0, MAX_LANGUAGES);
  const otherSize = ranked.slice(MAX_LANGUAGES).reduce((sum, lang) => sum + lang.size, 0);

  const languages = top.map((lang) => ({
    name: lang.name,
    color: lang.color,
    percent: Number(((lang.size / grandTotal) * 100).toFixed(1))
  }));

  if (otherSize > 0) {
    languages.push({
      name: 'Other',
      color: '#6B7280',
      percent: Number(((otherSize / grandTotal) * 100).toFixed(1))
    });
  }

  return languages;
};

const ACTIVITY_BUILDERS = {
  PushEvent: (event) => {
    const commits = event.payload?.commits ?? [];
    const head = commits[commits.length - 1];
    if (!head) return null;

    return {
      type: 'commit',
      label: commits.length > 1 ? `Pushed ${commits.length} commits` : 'Pushed a commit',
      title: head.message.split('\n')[0]
    };
  },
  PullRequestEvent: (event) => ({
    type: 'pull-request',
    label: `${event.payload.action === 'closed' ? 'Merged' : 'Opened'} a pull request`,
    title: event.payload.pull_request?.title ?? ''
  }),
  PullRequestReviewEvent: (event) => ({
    type: 'pull-request',
    label: 'Reviewed a pull request',
    title: event.payload.pull_request?.title ?? ''
  }),
  IssuesEvent: (event) => ({
    type: 'issue',
    label: `${event.payload.action === 'closed' ? 'Closed' : 'Opened'} an issue`,
    title: event.payload.issue?.title ?? ''
  }),
  CreateEvent: (event) =>
    event.payload.ref_type === 'repository'
      ? { type: 'repo', label: 'Created a repository', title: event.repo.name.split('/')[1] }
      : null,
  WatchEvent: (event) => ({ type: 'star', label: 'Starred a repository', title: event.repo.name.split('/')[1] })
};

/**
 * The public events feed only exposes public activity and lags by a few
 * minutes, so it is regularly empty for accounts that work mostly in private
 * repos. Top the list up with the most recently pushed public repos so the
 * panel always has something truthful to show.
 */
const buildActivity = (events, repos) => {
  const fromEvents = events
    .map((event) => {
      const built = ACTIVITY_BUILDERS[event.type]?.(event);
      if (!built || !built.title) return null;

      return {
        ...built,
        repo: event.repo.name,
        url: `https://github.com/${event.repo.name}`,
        date: event.created_at
      };
    })
    .filter(Boolean);

  const seenRepos = new Set(fromEvents.map((item) => item.repo));

  const fromRepos = repos
    .filter((repo) => repo.pushedAt && !seenRepos.has(repo.nameWithOwner))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
    .map((repo) => ({
      type: 'repo',
      label: 'Latest push',
      title: repo.description || repo.name,
      repo: repo.nameWithOwner,
      url: repo.url,
      date: repo.pushedAt
    }));

  return [...fromEvents, ...fromRepos].slice(0, MAX_ACTIVITY);
};

const main = async () => {
  if (!TOKEN) {
    console.warn('[github-stats] No GITHUB_TOKEN set - keeping the committed fallback data.');
    return;
  }

  const { user } = await graphql(PROFILE_QUERY, { login: USERNAME });
  const years = user.contributionsCollection.contributionYears;

  const yearlyCollections = await Promise.all(
    years.map(async (year) => {
      const data = await graphql(YEAR_QUERY, {
        login: USERNAME,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`
      });

      return { year, collection: data.user.contributionsCollection };
    })
  );

  // Newest year first is what GitHub returns; sort so index 0 is always the latest.
  yearlyCollections.sort((a, b) => b.year - a.year);
  const latest = yearlyCollections[0].collection;

  const allDays = yearlyCollections.flatMap(({ collection }) =>
    collection.contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount }))
    )
  );

  const { current, longest } = calculateStreaks(allDays);

  // The heatmap shows a rolling window ending on the most recent recorded day.
  const latestWeeks = yearlyCollections
    .flatMap(({ collection }) => collection.contributionCalendar.weeks)
    .sort((a, b) => a.contributionDays[0].date.localeCompare(b.contributionDays[0].date))
    .slice(-HEATMAP_WEEKS)
    .map((week) => week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })));

  const events = await rest(`/users/${USERNAME}/events/public?per_page=60`).catch((err) => {
    console.warn(`[github-stats] Activity feed unavailable: ${err.message}`);
    return [];
  });

  const repos = user.repositories.nodes;

  const stats = {
    username: user.login,
    name: user.name,
    profileUrl: `https://github.com/${user.login}`,
    generatedAt: new Date().toISOString(),
    totals: {
      contributionsAllTime: allDays.reduce((sum, day) => sum + day.count, 0),
      contributionsLatestYear: latest.contributionCalendar.totalContributions,
      latestYear: yearlyCollections[0].year,
      commits: latest.totalCommitContributions,
      pullRequests: latest.totalPullRequestContributions,
      issues: latest.totalIssueContributions,
      reviews: latest.totalPullRequestReviewContributions,
      repositories: user.repositories.totalCount,
      stars: repos.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      followers: user.followers.totalCount,
      currentStreak: current,
      longestStreak: longest
    },
    weeks: latestWeeks,
    languages: buildLanguages(repos),
    activity: buildActivity(events, repos)
  };

  await writeFile(OUT_FILE, `${JSON.stringify(stats, null, 2)}\n`, 'utf8');
  console.log(
    `[github-stats] Wrote ${OUT_FILE} - ${stats.totals.contributionsAllTime} contributions, ` +
      `${stats.weeks.length} weeks, ${stats.languages.length} languages, ${stats.activity.length} events.`
  );
};

main().catch((err) => {
  console.error(`[github-stats] ${err.message}`);
  process.exit(1);
});
