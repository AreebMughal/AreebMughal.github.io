import { ESKILLS } from 'enum';
import githubStats from './data/github-stats.json';

export const METADATA = {
  title: 'Areeb Arshad | Portfolio',
  description:
    'I architect powerful backend systems that drive seamless user experiences, connecting logic, data, and design into scalable solutions.',
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
  'I architect scalable applications',
  'I engineer robust backend systems',
  'I design high-performance database solutions',
  'I craft responsive & modern UIs',
  'I lead teams and deliver innovative software solutions',
  'I adapt quickly and embrace new technologies with passion'
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
  url: string;
  tech: string[];
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
  database: [ESKILLS.MONGODB, ESKILLS.POSTGRESQL, ESKILLS.MYSQL, ESKILLS.REDIS, ESKILLS.FIREBASE],
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
    ESKILLS.SASS
  ],
  cloud: [ESKILLS.AWS, ESKILLS.EC2, ESKILLS.LAMBDA, ESKILLS.GCP, ESKILLS.DOCKER],
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
    title: 'Senior Software Engineer - Full Stack',
    size: ItemSize.SMALL,
    subtitle: 'Worked on microservices and frontend for a health-care platform',
    image: '/timeline/brackets.svg',
    slideImage: '/timeline/mern.png',
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
    title: 'Executive Software Engineer',
    size: ItemSize.SMALL,
    subtitle: 'Worked on microservice based Diagnostic Product',
    image: '/timeline/rendream.svg',
    slideImage: '/timeline/tech-tehwar.jpg',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Software Engineer',
    size: ItemSize.SMALL,
    subtitle: 'Lead different projects and teams, built scalable solutions',
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
    title: '2023',
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Software Engineer',
    size: ItemSize.SMALL,
    subtitle: 'Lead different projects and teams, built scalable solutions',
    image: '/timeline/zapta-blue.svg',
    slideImage: '/timeline/session.jpg',
    shouldDrawLine: true,
    alignment: Branch.LEFT
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
    subtitle: 'Developed and maintained scalable solutions',
    image: '/timeline/zapta-blue.svg',
    slideImage: '/timeline/award.jpg',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'Software Engineer Graduate',
    size: ItemSize.SMALL,
    subtitle: 'Graduated in Software Engineering from GIFT University',
    image: '/timeline/gift-uni.svg',
    slideImage: '/timeline/gift.png',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: 'MERN Stack Developer',
    size: ItemSize.SMALL,
    subtitle: 'Worked on multiple projects with MERN stack',
    // image: '/timeline/octanner.svg',
    slideImage: '/timeline/mern.png',
    shouldDrawLine: true,
    alignment: Branch.RIGHT
  },
  {
    type: NodeTypes.CONVERGE
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
