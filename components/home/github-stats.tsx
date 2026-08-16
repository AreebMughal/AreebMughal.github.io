import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { GITHUB_STATS, MENULINKS } from '../../constants';

// Empty -> brightest, derived from the site's .text-gradient (#6dd5ed -> #2193b0).
const LEVEL_COLORS = ['#1F2937', '#0E4B5E', '#157C97', '#2193B0', '#6DD5ED'];

const CELL = 11;
const CELL_GAP = 3;
const CELL_STEP = CELL + CELL_GAP;
const LABEL_GUTTER = 30;
const MONTH_BAR = 18;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ACTIVITY_ICONS: Record<string, string> = {
  commit: 'M10.5 7.75a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0ZM12 7.75h3.25M0 7.75h5',
  'pull-request': 'M4 3.5v9M4 3.5a1.5 1.5 0 1 0 0-.001ZM12 12.5a1.5 1.5 0 1 0 0 .001ZM12 11V6.5L8.5 3',
  issue: 'M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM8 5v4M8 11h.01',
  repo: 'M2 2.5A1.5 1.5 0 0 1 3.5 1H13v11H3.5A1.5 1.5 0 0 0 2 13.5v-11ZM2 13.5A1.5 1.5 0 0 0 3.5 15H13v-3',
  star: 'M8 1.5l2 4.2 4.5.6-3.3 3.2.8 4.5L8 11.8 3.9 14l.8-4.5L1.5 6.3l4.5-.6L8 1.5Z'
};

/** Static build + client render must agree, so format without a live clock. */
const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
};

const getLevel = (count: number, max: number): number => {
  if (count <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
};

interface StatTile {
  label: string;
  value: number;
  suffix?: string;
}

const GithubStatsSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const [willChange, setWillChange] = useState(false);

  const { totals, weeks, languages, activity, profileUrl, username } = GITHUB_STATS;

  const maxCount = Math.max(1, ...weeks.flatMap((week) => week.map((day) => day.count)));
  const heatmapWidth = LABEL_GUTTER + weeks.length * CELL_STEP;
  const heatmapHeight = MONTH_BAR + 7 * CELL_STEP;

  const tiles: StatTile[] = [
    { label: `Contributions in ${totals.latestYear}`, value: totals.contributionsLatestYear },
    { label: 'Current streak', value: totals.currentStreak, suffix: totals.currentStreak === 1 ? ' day' : ' days' },
    { label: 'Longest streak', value: totals.longestStreak, suffix: totals.longestStreak === 1 ? ' day' : ' days' },
    { label: 'Public repositories', value: totals.repositories }
  ];

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    revealTl.from(targetSection.current.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.3 }, '<');

    const trigger = ScrollTrigger.create({
      trigger: targetSection.current.querySelector('.github-wrapper'),
      start: '100px bottom',
      end: 'center center',
      animation: revealTl,
      scrub: 0,
      onToggle: (self) => setWillChange(self.isActive)
    });

    return () => trigger.kill();
  }, [targetSection]);

  // Count-up runs once when the tiles scroll into view.
  useEffect(() => {
    const counters = gsap.utils.toArray<HTMLElement>(targetSection.current.querySelectorAll('.stat-value'));

    const triggers = counters.map((counter) => {
      const target = Number(counter.dataset.value);
      const suffix = counter.dataset.suffix || '';
      const proxy = { value: 0 };

      return ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(proxy, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = `${Math.round(proxy.value).toLocaleString('en-US')}${suffix}`;
            }
          })
      });
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [targetSection]);

  const renderSectionTitle = (): React.ReactNode => (
    <div className="flex flex-col">
      <p className="section-title-sm seq">OPEN SOURCE</p>
      <h1 className="section-heading seq mt-2">GitHub Activity</h1>
      <h2 className="text-2xl md:max-w-3xl w-full seq mt-2">
        Where I spend my keystrokes — {totals.contributionsAllTime.toLocaleString('en-US')} contributions and counting,
        pulled straight from the GitHub API on every deploy.
      </h2>
    </div>
  );

  const renderTiles = (): React.ReactNode => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
      {tiles.map((tile) => (
        <div key={tile.label} className="seq bg-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <p
            className="text-4xl md:text-5xl font-bold text-gradient"
            data-value={tile.value}
            data-suffix={tile.suffix || ''}
          >
            {`0${tile.suffix || ''}`}
          </p>
          <p className="text-gray-200 text-sm mt-3 tracking-wide">{tile.label}</p>
        </div>
      ))}
    </div>
  );

  const renderMonthLabels = (): React.ReactNode => {
    let lastMonth = -1;

    return weeks.map((week, weekIndex) => {
      const month = new Date(week[0].date).getUTCMonth();
      if (month === lastMonth) return null;
      lastMonth = month;

      // Skip a label that would collide with the right edge.
      if (weekIndex > weeks.length - 3) return null;

      return (
        <text
          key={week[0].date}
          x={LABEL_GUTTER + weekIndex * CELL_STEP}
          y={12}
          className="fill-current text-gray-400"
          fontSize="10"
        >
          {MONTHS[month]}
        </text>
      );
    });
  };

  const renderHeatmap = (): React.ReactNode => (
    <div className="seq bg-gray-800 rounded-2xl p-6 mt-4">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <p className="section-title-sm">CONTRIBUTION GRAPH</p>
        <p className="text-gray-400 text-sm">Last {weeks.length} weeks</p>
      </div>

      <div className="overflow-x-auto project-wrapper">
        <svg
          width={heatmapWidth}
          height={heatmapHeight}
          viewBox={`0 0 ${heatmapWidth} ${heatmapHeight}`}
          className="max-w-none"
          role="img"
          aria-label={`GitHub contribution graph for ${username}`}
        >
          {renderMonthLabels()}

          {['Mon', 'Wed', 'Fri'].map((day, index) => (
            <text
              key={day}
              x={0}
              y={MONTH_BAR + (index * 2 + 1) * CELL_STEP + CELL - 2}
              className="fill-current text-gray-400"
              fontSize="10"
            >
              {day}
            </text>
          ))}

          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <rect
                key={day.date}
                x={LABEL_GUTTER + weekIndex * CELL_STEP}
                y={MONTH_BAR + dayIndex * CELL_STEP}
                width={CELL}
                height={CELL}
                rx={2}
                fill={LEVEL_COLORS[getLevel(day.count, maxCount)]}
              >
                <title>{`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}</title>
              </rect>
            ))
          )}
        </svg>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-gray-400 text-sm">
        <span>Less</span>
        {LEVEL_COLORS.map((color) => (
          <span key={color} className="inline-block rounded-sm" style={{ width: CELL, height: CELL, background: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );

  const renderLanguages = (): React.ReactNode => (
    <div className="seq bg-gray-800 rounded-2xl p-6 flex flex-col">
      <p className="section-title-sm mb-4">MOST USED LANGUAGES</p>

      {languages.length === 0 ? (
        <p className="text-gray-400">Language breakdown unavailable.</p>
      ) : (
        <>
          <div className="flex w-full h-3 rounded-full overflow-hidden">
            {languages.map((language) => (
              <span
                key={language.name}
                style={{ width: `${language.percent}%`, background: language.color }}
                title={`${language.name} ${language.percent}%`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
            {languages.map((language) => (
              <div key={language.name} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full flex-none"
                  style={{ background: language.color }}
                />
                <span className="text-gray-200">{language.name}</span>
                <span className="text-gray-400 text-sm">{language.percent}%</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderActivity = (): React.ReactNode => (
    <div className="seq bg-gray-800 rounded-2xl p-6 flex flex-col">
      <p className="section-title-sm mb-4">RECENT ACTIVITY</p>

      {activity.length === 0 ? (
        <p className="text-gray-400">No public activity to show right now.</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {activity.map((item) => (
            <li key={`${item.repo}-${item.date}-${item.title}`} className="flex gap-4">
              <span className="flex-none mt-1 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d={ACTIVITY_ICONS[item.type] || ACTIVITY_ICONS.commit}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="flex flex-col min-w-0">
                <p className="text-gray-200 truncate">{item.title}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {item.label} in{' '}
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-gradient font-medium">
                    {item.repo}
                  </a>{' '}
                  · {formatDate(item.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section
      className="w-full relative select-none section-container py-12 mb-24 flex flex-col justify-center"
      id={MENULINKS[4].ref}
      ref={targetSection}
    >
      <div className={`github-wrapper flex flex-col ${willChange ? 'will-change-opacity' : ''}`}>
        {renderSectionTitle()}
        {renderTiles()}
        {renderHeatmap()}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {renderLanguages()}
          {renderActivity()}
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="seq text-gradient font-medium mt-8 w-fit text-lg"
        >
          View full profile on GitHub →
        </a>
      </div>
    </section>
  );
};

export default GithubStatsSection;
