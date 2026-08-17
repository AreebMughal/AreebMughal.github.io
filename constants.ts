import { ESKILLS } from 'enum';
import githubStats from './data/github-stats.json';

export const METADATA = {
  title: 'Areeb Arshad | Senior Full-Stack Software Engineer',
  description:
    'Senior Full-Stack Software Engineer with 6+ years architecting scalable, secure systems for international clients — NestJS microservices, database design, and HIPAA-compliant healthcare platforms.',
  siteUrl: 'https://areebmughal.github.io/',
  previewImage: 'https://areebmughal.github.io/preview.png'
};

export const GITHUB_USERNAME = 'AreebMughal';

export interface GithubDay {
  date: string;
  count: number;
}

export interface GithubLanguage {
  name: string;
  color: string;
  percent: number;
}

export interface GithubActivityItem {
  type: string;
  label: string;
  title: string;
  repo: string;
  url: string;
  date: string;
}

export interface GithubStats {
  username: string;
  name: string;
  profileUrl: string;
  generatedAt: string | null;
  totals: {
    contributionsAllTime: number;
    contributionsLatestYear: number;
    latestYear: number;
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
    repositories: number;
    stars: number;
    followers: number;
    currentStreak: number;
    longestStreak: number;
  };
  weeks: GithubDay[][];
  languages: GithubLanguage[];
  activity: GithubActivityItem[];
}

/** Regenerated on every deploy by scripts/fetch-github-stats.mjs. */
export const GITHUB_STATS = githubStats as GithubStats;

export const MENULINKS = [
  {
    name: 'Home',
    ref: 'home'
  },
  {
    name: 'Works',
    ref: 'works'
  },
  {
    name: 'Skills',
    ref: 'skills'
  },
  {
    name: 'Timeline',
    ref: 'timeline'
  },
  {
    name: 'GitHub',
    ref: 'github'
  },
  {
    name: 'Contact',
    ref: 'contact'
  }
];

export const TYPED_STRINGS = [
  'I architect scalable microservices',
  'I design databases that hold up under load',
  'I build HIPAA-compliant healthcare platforms',
  'I lead migrations without breaking production',
  'I turn business requirements into resilient systems',
  'I mentor engineers into stronger engineers'
];

export const EMAIL = 'areebarshad.m@gmail.com';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/areeb-arshad27/',
  github: 'https://github.com/AreebMughal',
  instagram: 'https://www.instagram.com/areebmughal779/'
  // facebook: 'https://www.facebook.com/areeb.arshad.5',
  // twitter: 'https://twitter.com/areebmughal27'
};

export interface IProject {
  name: string;
  image: string;
  blurImage: string;
  description: string;
  gradient: [string, string];
  /** Omit when the product has no public URL — the tile renders unlinked. */
  url?: string;
  tech: string[];
  /**
   * True when `image` is generated cover art rather than a product screenshot.
   * Keeps the distinction explicit in the data instead of implied by a path.
   */
  isCoverArt?: boolean;
}

export const PROJECTS: IProject[] = [
  {
    name: 'MDDS - Health Care',
    image: '/projects/health-care.png',
    blurImage: '/projects/blur/figgen-blur.jpg',
    description: 'A HIPAA-compliant FDA registered system to manage PAP/NIV for chronic sleep apnea patients',
    gradient: ['#1F6582', '#1ABCFE'],
    url: 'https://www.monitairhealth.com/',
    tech: [ESKILLS.TYPESCRIPT, ESKILLS.NESTJS, ESKILLS.MONGODB, ESKILLS.NEXT, ESKILLS.TAILWIND]
  },
  {
    name: 'My QuickSteps',
    image: '/projects/quick-steps-dashboard.png',
    blurImage: '/projects/blur/myokr-blur.jpg',
    description: 'Build Invoices, Track Payments, and Manage Clients with ease',
    gradient: ['#153BB9', '#0E2C8B'],
    url: 'https://app.my-quicksteps.com/',
    tech: [ESKILLS.TYPESCRIPT, ESKILLS.NESTJS, ESKILLS.NEXT, ESKILLS.POSTGRESQL, ESKILLS.TAILWIND]
  },
  {
    name: 'WagerWise',
    image: '/projects/wagerwise-dashboard.png',
    blurImage: '/projects/blur/dlt-website-blur.jpg',
    description: 'Scraped data from multiple sources to provide insights on sports',
    gradient: ['#245B57', '#004741'],
    url: 'https://wagerwise.app/',
    tech: [ESKILLS.PYTHON, ESKILLS.FLASK, ESKILLS.SELENIUM, ESKILLS.MONGODB]
  },
  {
    name: 'Opportunities Bridge',
    image: '/projects/opportunities-bridge.png',
    blurImage: '/projects/blur/dl-unify-blur.jpg',
    description: 'A platform to connect students with opportunities in the diverse fields',
    gradient: ['#003052', '#167187'],
    url: 'https://opportunitiesbridge.com/',
    tech: [ESKILLS.TYPESCRIPT, ESKILLS.NEXT, ESKILLS.REDUX, ESKILLS.TAILWIND, ESKILLS.MONGODB]
  },
  {
    name: 'Toothy.ai',
    image: '/projects/covers/toothy-ai.svg',
    blurImage: '/projects/covers/toothy-ai.svg',
    description: 'AI-powered RPA automating dental insurance verification and revenue-cycle workflows',
    gradient: ['#2B2F77', '#6C5CE0'],
    isCoverArt: true,
    tech: [ESKILLS.PYTHON, ESKILLS.NESTJS, ESKILLS.SUPABASE, ESKILLS.POSTGRESQL]
  },
  {
    name: 'RevConductor',
    image: '/projects/covers/revconductor.svg',
    blurImage: '/projects/covers/revconductor.svg',
    description: 'Industry cloud connecting the end-to-end supply chain for high-tech manufacturers',
    gradient: ['#6B3410', '#C98B2E'],
    isCoverArt: true,
    tech: [ESKILLS.GRAPHQL, ESKILLS.POSTGRESQL, ESKILLS.NODEJS, ESKILLS.DOCKER]
  },
  {
    name: 'Lahebo',
    image: '/projects/covers/lahebo.svg',
    blurImage: '/projects/covers/lahebo.svg',
    description: 'GRC platform tracking Australian legislative change against business risk and actions',
    gradient: ['#2E3A4F', '#5B7BA6'],
    isCoverArt: true,
    tech: [ESKILLS.NESTJS, ESKILLS.POSTGRESQL, ESKILLS.TYPESCRIPT]
  },
  {
    name: 'Temple Day Spa',
    image: '/projects/covers/temple-day-spa.svg',
    blurImage: '/projects/covers/temple-day-spa.svg',
    description: 'Client management and appointment scheduling with room and therapist preferences',
    gradient: ['#5C3A4E', '#B07A94'],
    isCoverArt: true,
    tech: [ESKILLS.EXPRESS, ESKILLS.MONGODB, ESKILLS.REACT, ESKILLS.MUI, ESKILLS.REDUX]
  }
];

export const SKILLS = {
  backend: [
    ESKILLS.JAVASCRIPT,
    ESKILLS.TYPESCRIPT,
    ESKILLS.NODEJS,
    ESKILLS.EXPRESS,
    ESKILLS.NESTJS,
    ESKILLS.GRAPHQL,
    ESKILLS.PYTHON,
    ESKILLS.FLASK,
    ESKILLS.SOCKETS
  ],
  database: [
    ESKILLS.POSTGRESQL,
    ESKILLS.MONGODB,
    ESKILLS.MYSQL,
    ESKILLS.SQL,
    ESKILLS.REDIS,
    ESKILLS.SUPABASE,
    ESKILLS.FIREBASE
  ],
  frontend: [
    ESKILLS.JAVASCRIPT,
    ESKILLS.TYPESCRIPT,
    ESKILLS.REACT,
    ESKILLS.NEXT,
    ESKILLS.REDUX,
    ESKILLS.REACT_QUERY,
    ESKILLS.TAILWIND,
    ESKILLS.MUI,
    ESKILLS.ANTD,
    ESKILLS.SVG,
    ESKILLS.HTML,
    ESKILLS.CSS,
    ESKILLS.SASS,
    ESKILLS.GASP
  ],
  // EC2 and GCP were listed here but have no icon in public/skills, so they
  // rendered as broken images. AWS covers EC2; GCP is not on the CV.
  cloud: [ESKILLS.AWS, ESKILLS.LAMBDA, ESKILLS.DOCKER],
  integration: [
    ESKILLS.STRIPE,
    ESKILLS.SENDGRID,
    ESKILLS.TWILIO,
    ESKILLS.AWS_LAMBDA,
    ESKILLS.AWS_SNS,
    ESKILLS.AWS_S3,
    ESKILLS.AWS_SES,
    ESKILLS.AWS_SQS
  ],
  other: [ESKILLS.GIT, ESKILLS.GITHUB, ESKILLS.POSTMAN, ESKILLS.JIRA, ESKILLS.NGINX, ESKILLS.CLICKUP, ESKILLS.SELENIUM]
};

export const SKILLS_MAP: Record<ESKILLS, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  nodejs: 'Node.js',
  express: 'Express.js',
  nestjs: 'NestJS',
  graphql: 'GraphQL',
  python: 'Python',
  flask: 'Flask',
  sockets: 'Socket.IO',
  mongodb: 'MongoDB',
  postgresql: 'PostgreSQL',
  mysql: 'MySQL',
  sql: 'SQL',
  supabase: 'Supabase',
  redis: 'Redis',
  react: 'React',
  next: 'Next.js',
  redux: 'Redux',
  angular: 'Angular',
  html: 'HTML',
  css: 'CSS',
  sass: 'Sass',
  tailwind: 'Tailwind CSS',
  mui: 'Material UI',
  antd: 'AntDesign',
  gsap: 'GSAP',
  svg: 'SVG',
  stripe: 'Stripe',
  sendgrid: 'SendGrid',
  twilio: 'Twilio',
  firebase: 'Firebase',
  docker: 'Docker',
  trello: 'Trello',
  postman: 'Postman',
  git: 'Git',
  github: 'GitHub',
  aws: 'AWS',
  'aws-ec2': 'AWS EC2',
  'aws-lambda': 'AWS Lambda',
  'aws-s3': 'AWS S3',
  'aws-sns': 'AWS SNS',
  'aws-ses': 'AWS SES',
  'aws-sqs': 'AWS SQS',
  'react-query': 'React Query',
  gcp: 'Google Cloud',
  jira: 'Jira',
  nginx: 'Nginx',
  clickup: 'ClickUp',
  selenium: 'Selenium'
};

export enum Branch {
  LEFT = 'leftSide',
  RIGHT = 'rightSide'
}

export enum NodeTypes {
  CONVERGE = 'converge',
  DIVERGE = 'diverge',
  CHECKPOINT = 'checkpoint'
}

export enum ItemSize {
  SMALL = 'small',
  LARGE = 'large'
}

export const TIMELINE: Array<TimelineNodeV2> = [
  {
    type: NodeTypes.CHECKPOINT,
    title: '2026',
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Senior Software Engineer — Full Stack',
    size: ItemSize.SMALL,
    subtitle:
      'Brackets Private Limited · Dec 2024 – Present — Own backend architecture and database design across NestJS microservices for HIPAA-compliant healthcare platforms, and run the CMIT internship programme',
    image: '/timeline/brackets.svg',
    slideImage: '/timeline/brackets-mentor.png',
    shouldDrawLine: true,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: '2024',
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.DIVERGE
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Executive Software Engineer — Full Stack',
    size: ItemSize.SMALL,
    subtitle:
      'Rendream · Jun – Dec 2024 — Built microservices features across Socket.IO, S3 chunked uploads and MySQL data handling',
    image: '/timeline/rendream.svg',
    slideImage: '/timeline/tech-tehwar.jpg',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Software Engineer — Full Stack',
    size: ItemSize.SMALL,
    subtitle:
      'ZAPTA Technologies · Oct 2022 – Jun 2024 — Led cross-functional teams across concurrent client projects, owning technical direction, code quality and delivery',
    image: '/timeline/zapta-blue.svg',
    slideImage: '/timeline/gift-zapta.jpg',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CONVERGE
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: '2022',
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.DIVERGE
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Associate Software Engineer',
    size: ItemSize.SMALL,
    subtitle:
      'ZAPTA Technologies — Designed database schemas and delivered production features end to end before stepping up to Software Engineer',
    image: '/timeline/zapta-blue.svg',
    slideImage: '/timeline/award.jpg',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'BS Software Engineering',
    size: ItemSize.SMALL,
    subtitle: 'GIFT University · Sep 2018 – Oct 2022 — Graduated with a 3.92 CGPA',
    image: '/timeline/gift-uni.svg',
    slideImage: '/timeline/gift.png',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CONVERGE
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: '2021',
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Software Engineer',
    size: ItemSize.SMALL,
    subtitle:
      'Saigma Strategic Systems · May 2021 – Aug 2022 — Built and maintained production MERN stack applications, designing schemas and architecture end to end',
    slideImage: '/timeline/mern.png',
    shouldDrawLine: true,
    alignment: Branch.LEFT
  }
];

export type TimelineNodeV2 = CheckpointNode | BranchNode;

export interface CheckpointNode {
  type: NodeTypes.CHECKPOINT;
  title: string;
  subtitle?: string;
  size: ItemSize;
  image?: string;
  slideImage?: string;
  shouldDrawLine: boolean;
  alignment: Branch;
}

export interface BranchNode {
  type: NodeTypes.CONVERGE | NodeTypes.DIVERGE;
}

export const GTAG = 'G-X08W73HEJM';
