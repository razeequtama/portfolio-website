import type {
  SectionMeta,
  DeveloperProfile,
  ProjectItem,
  ExperienceItem,
  SkillCategory,
  AboutContent,
  ContactContent,
} from '../types/portfolio';

/* =========================================================================
   PORTFOLIO CONFIGURATION & DATA SOURCE
   Tailored for Raziq Rabbani Utama — Software Engineering Internship Portfolio
   ========================================================================= */

/* === Developer Profile & Quick At-a-Glance Highlights === */
export const developerProfile: DeveloperProfile = {
  name: 'Raziq Rabbani Utama',
  role: 'Software Engineer',
  status: 'Actively seeking Software Engineering Internship opportunities',
  location: 'Kota Bekasi, Jawa Barat, Indonesia',
  yearsExperience: 'CS & Systems',
  projectsShipped: 'Full-Stack',
  systemReliability: 'Available',
};

/* === Section Definitions (7 items in the circular turntable carousel) === */
export const portfolioSections: SectionMeta[] = [
  {
    id: 'welcome',
    index: 0,
    number: '01',
    cardSuit: 'hearts',
    cardRank: 'A',
    title: 'WELCOME',
    subtitle: 'Introduction and candidate summary',
    shortDesc: 'Hero introduction, core technical focus, at-a-glance metrics, and key links.',
    badge: 'Overview',
  },
  {
    id: 'engineering',
    index: 1,
    number: '02',
    cardSuit: 'spades',
    cardRank: '2',
    title: 'ENGINEERING FOCUS',
    subtitle: 'How I choose an approach, think across boundaries, and check behavior.',
    shortDesc: 'Problem fit, thoughtful implementation, and correctness with clear limits.',
    badge: 'Deep Dive',
  },
  {
    id: 'projects',
    index: 2,
    number: '03',
    cardSuit: 'diamonds',
    cardRank: '3',
    title: 'MY PROJECTS',
    subtitle: 'Featured software projects and builds',
    shortDesc: 'Full stack web applications, FastAPI backends, and systems utilities.',
    badge: 'Work',
  },
  {
    id: 'experience',
    index: 3,
    number: '04',
    cardSuit: 'clubs',
    cardRank: '4',
    title: 'EXPERIENCE',
    subtitle: 'Academic background and practical experience',
    shortDesc: 'Education trajectory, coursework foundations, and self-directed engineering.',
    badge: 'Timeline',
  },
  {
    id: 'tech-stack',
    index: 4,
    number: '05',
    cardSuit: 'hearts',
    cardRank: '5',
    title: 'TECH STACK',
    subtitle: 'Languages, frameworks, and developer tools',
    shortDesc: 'Frontend, backend, databases, and Linux environments.',
    badge: 'Skills',
  },
  {
    id: 'about',
    index: 5,
    number: '06',
    cardSuit: 'clubs',
    cardRank: '6',
    title: 'ABOUT ME',
    subtitle: 'Background, values, and learning mindset',
    shortDesc: 'Engineering philosophy, curiosity outside code, and career goals.',
    badge: 'Personal',
  },
  {
    id: 'contact',
    index: 6,
    number: '07',
    cardSuit: 'diamonds',
    cardRank: '7',
    title: 'CONTACT ME',
    subtitle: 'Direct communication channels',
    shortDesc: 'Direct email, GitHub, LinkedIn, and collaboration inquiries.',
    badge: 'Connect',
  },
];

/* =========================================================================
   02. PROJECTS DATA
   ========================================================================= */
export const projectsData: ProjectItem[] = [
  {
    id: 'omnitrack-task-hub',
    title: 'MERCURY',
    subtitle: 'Real-Time Demand intelligence',
    description:
      'Mercury is an end-to-end commerce intelligence command center that transforms raw transactional data, inventory levels, and competitor market shifts into auditable operational decisions. It couples a responsive Next.js 16 frontend, an Express 5 API gateway, a PostgreSQL 16 relational data store, and a Python FastAPI microservice powered by Scikit-Learn continuous linear regression.',
    category: 'Full Stack',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/mercury-demand-intelligence',
    videoDemoUrl: '/video_demos/mercury_video_demo.mp4',
    metrics: ['Role-based access control', 'Type-safe API contracts', 'Fully responsive UI'],
    architectureNotes: 'Decoupled modular architecture separating presentation components from API data fetching hooks.',
  },
  {
    id: 'fastapi-pulse-service',
    title: 'AEGIS',
    subtitle: 'Financial Fraud Detection & Graph Intelligence Platform',
    description:
      'Aegis is an enterprise-grade transactional fraud detection, behavioral anomaly scoring, entity network graph intelligence, and analyst case management powered by Machine Learning and Redis.',
    category: 'Cloud',
    techStack: ['Python', 'FastAPI', 'SQL', 'Docker', 'Postman'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/aegis-fraud-detection',
    videoDemoUrl: '/video_demos/aegis_video_demo.mp4',
    metrics: ['Async non-blocking I/O', 'Automated OpenAPI docs', 'Dockerized deployment'],
    architectureNotes: 'Repository pattern isolating data access operations from business validation endpoints.',
  },
  {
    id: 'corecraft-memory-engine',
    title: 'Lux',
    subtitle: 'High-performance C++ circular buffer & data structure library',
    description:
      'LUX is an evidence-based data observability and data quality validation platform built for analytics engineers, and data consumers. It evaluates datasets against deterministic quality rules, maps multi-tier upstream-to-downstream lineage DAGs, disentangles pipeline execution success from underlying data corruption, and coordinates structured incident investigations with cryptographically verifiable audit reports.',
    category: 'Systems',
    techStack: ['C++', 'Linux', 'Bash', 'Makefile'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/lux-data-observability',
    videoDemoUrl: '/video_demos/lux_video_demo.mp4',
    metrics: ['Zero memory leaks verified', 'O(1) circular buffer ops', 'Strict compiler warnings'],
    architectureNotes: 'RAII idiom ensuring deterministic deallocation and explicit ownership semantics.',
  },
];

/* =========================================================================
   04. EXPERIENCE TIMELINE DATA
   ========================================================================= */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-independent-builder',
    role: 'Software Engineering Student & Builder',
    company: 'Independent & Academic Projects',
    period: '2024 - Present',
    location: 'Kota Bekasi, Indonesia (Remote / Hybrid)',
    type: 'Full-Time',
    summary:
      'Designing and developing full-stack web applications, backend services, and systems utilities. Focusing on clean code architecture, type safety, and modern developer workflows.',
    achievements: [
      'Engineered full-stack applications integrating React, TypeScript, Python / FastAPI, and relational SQL databases.',
      'Adopted professional Git version control workflows, maintaining structured commits and modular repositories on GitHub.',
      'Explored core systems concepts including C++ memory management, Linux terminal scripting, and containerized Docker environments.',
    ],
    techStack: ['TypeScript', 'React', 'Python', 'FastAPI', 'C++', 'SQL', 'Docker', 'Linux'],
    featuredBadge: 'Current Focus',
  },
  {
    id: 'exp-education',
    role: 'Undergraduate in Computer Science / Informatics',
    company: 'University Studies',
    period: 'In Progress (Expected 2026/2027)',
    location: 'Indonesia',
    type: 'Education',
    summary:
      'Pursuing a comprehensive computer science education covering algorithms, software engineering principles, operating systems, and database systems.',
    achievements: [
      'Completed foundational coursework in Data Structures & Algorithms, Object-Oriented Programming (C++ / Java), and Relational Databases.',
      'Collaborated effectively in student programming teams to design, build, and present academic semester projects.',
      'Active participant in coding practice, algorithmic problem-solving, and technical study workshops.',
    ],
    techStack: ['Data Structures', 'Algorithms', 'C++', 'Python', 'SQL', 'OOP', 'Linux'],
  },
  {
    id: 'exp-developer-community',
    role: 'Technical Learner & Open Source Collaborator',
    company: 'Developer Communities & Hackathons',
    period: '2023 - Present',
    location: 'Online',
    type: 'Contract',
    summary:
      'Active learner engaging with open-source communities, technical documentation, and exploring emerging web and systems development tools.',
    achievements: [
      'Published and documented personal open-source repositories and reproducible code samples on GitHub.',
      'Built hands-on familiarity with Linux CLI environments, shell scripting (Bash), and Postman API testing suites.',
    ],
    techStack: ['Git', 'GitHub', 'Bash', 'Postman', 'VS Code'],
  },
];

/* =========================================================================
   05. TECH STACK & PROFICIENCY DATA
   ========================================================================= */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Core languages for web applications, scripting, and systems code',
    skills: [
      { name: 'TypeScript & JavaScript', level: 88, experienceYears: 'Core', highlight: 'Strict Typing, ES6+, Async/Await' },
      { name: 'Python', level: 85, experienceYears: 'Core', highlight: 'FastAPI, OOP, Automation Scripting' },
      { name: 'C++', level: 75, experienceYears: 'Intermediate', highlight: 'Memory Management, OOP, Algorithms' },
      { name: 'SQL', level: 82, experienceYears: 'Core', highlight: 'Queries, Joins, Relational Schemas' },
      { name: 'Bash & Shell', level: 72, experienceYears: 'Working', highlight: 'CLI Navigation, Automation Scripts' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Component architecture, state management, and modern responsive UI',
    skills: [
      { name: 'React.js', level: 86, experienceYears: 'Core', highlight: 'Hooks, Component Lifecycle, Modular Architecture' },
      { name: 'HTML5 & Modern CSS', level: 90, experienceYears: 'Proficient', highlight: 'Flexbox, Grid, CSS Variables, Animations' },
      { name: 'Vite & Build Tooling', level: 84, experienceYears: 'Proficient', highlight: 'Fast HMR, Bundling, Asset Optimization' },
      { name: 'Responsive Mobile Design', level: 88, experienceYears: 'Proficient', highlight: 'Mobile-first scaling, Touch ergonomics' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    description: 'RESTful web services, routing, and data validation',
    skills: [
      { name: 'FastAPI (Python)', level: 84, experienceYears: 'Proficient', highlight: 'Async endpoints, Pydantic, OpenAPI Docs' },
      { name: 'Node.js & Express.js', level: 82, experienceYears: 'Proficient', highlight: 'REST APIs, Middleware, Routing' },
      { name: 'RESTful Architecture', level: 86, experienceYears: 'Proficient', highlight: 'CRUD Design, Status Codes, JSON Contracts' },
      { name: 'Postman', level: 85, experienceYears: 'Proficient', highlight: 'Endpoint testing, Collections, API Debugging' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    description: 'Relational data modeling, querying, and persistent document storage',
    skills: [
      { name: 'PostgreSQL', level: 80, experienceYears: 'Proficient', highlight: 'Table Schemas, Foreign Keys, Normalization' },
      { name: 'MongoDB', level: 75, experienceYears: 'Working', highlight: 'Collections, BSON documents, CRUD queries' },
      { name: 'Relational Data Modeling', level: 82, experienceYears: 'Proficient', highlight: 'ER Diagrams, Constraints, Data Integrity' },
    ],
  },
  {
    id: 'tools',
    name: 'Developer Tools & Workflow',
    description: 'Version control, development environments, and deployment tools',
    skills: [
      { name: 'Git & GitHub', level: 88, experienceYears: 'Proficient', highlight: 'Branching, Commits, Pull Requests, Code Reviews' },
      { name: 'Linux / Unix CLI', level: 80, experienceYears: 'Proficient', highlight: 'Terminal commands, Permissions, File Systems' },
      { name: 'Docker', level: 72, experienceYears: 'Working', highlight: 'Containerization, Dockerfile, Container Runs' },
      { name: 'VS Code & Tooling', level: 90, experienceYears: 'Proficient', highlight: 'Extensions, Linting, Debuggers, Productivity' },
    ],
  },
];

/* =========================================================================
   06. ABOUT ME DATA
   ========================================================================= */
export const aboutData: AboutContent = {
  headline: 'Curious, driven, and committed to growing as a software engineer.',
  bioParagraphs: [
    'I am an aspiring Software Engineer and Computer Science student actively seeking my first software engineering internship. My technical enthusiasm spans full-stack web applications, backend service architecture, and systems programming fundamentals.',
    'I approach software engineering with curiosity and discipline. Whether building asynchronous REST APIs with Python and FastAPI, exploring C++ memory management and data structures, or crafting fluid and responsive web experiences with React and TypeScript, I prioritize writing clean, maintainable, and well-typed code.',
    'As an intern, I look forward to contributing meaningfully to production projects, absorbing best practices from senior mentors, and bringing a proactive, eager-to-learn mindset to every team challenge.',
  ],
  personalInterests: [
    {
      title: 'Analog Audio & Vinyl Turntables',
      description: 'Appreciating analog acoustics, mechanical turntables, and vinyl record sound engineering.',
      detail: 'Mechanical tonearms, vinyl sound grooves, acoustic precision.',
      tag: 'Craft',
    },
    {
      title: 'Algorithmic Problem Solving',
      description: 'Strengthening problem-solving intuition through data structure exercises and logic challenges.',
      detail: 'Graph traversal, dynamic programming, algorithmic efficiency.',
      tag: 'Computer Science',
    },
    {
      title: 'Open Source & Tech Exploration',
      description: 'Reading source code from popular open-source repositories and experimenting with new tools.',
      detail: 'Exploring compiler internals, developer tooling, web standards.',
      tag: 'Learning',
    },
    {
      title: 'Hardware & Workstation Setups',
      description: 'Curating ergonomic and minimalist developer hardware and mechanical keyboards.',
      detail: 'Mechanical switches, clean cable management, focused workspaces.',
      tag: 'Hardware',
    },
  ],
  coreValues: [
    {
      title: 'Continuous Growth & Humility',
      tagline: 'Always eager to learn, listen, and iterate.',
      description: 'Actively seeking feedback from teammates and mentors to rapidly improve code quality and engineering intuition.',
    },
    {
      title: 'Code Craftsmanship & Clarity',
      tagline: 'Clear and readable code always beats cleverness.',
      description: 'Writing descriptive, type-safe, and self-documenting code with meaningful naming conventions and modular organization.',
    },
    {
      title: 'Dependability & Team Ownership',
      tagline: 'Taking initiative and seeing problems through.',
      description: 'Communicating proactively, embracing challenging tasks, and demonstrating reliable follow-through on every project.',
    },
  ],
  careerTrajectory: [
    'Securing a software engineering internship to contribute to real-world production software.',
    'Deepening knowledge of backend architectures, scalable databases, and API performance.',
    'Continuously refining full-stack development skills with modern TypeScript and Python ecosystems.',
  ],
};

/* =========================================================================
   07. CONTACT DATA
   ========================================================================= */
export const contactData: ContactContent = {
  email: 'rabbaniu74m4@gmail.com',
  location: 'Kota Bekasi, Jawa Barat, Indonesia',
  availability: 'Open for Software Engineering Internship Opportunities (Full-Time or Part-Time)',
  responseTime: 'Within 24 business hours',
  resumeUrl: '/CV.pdf',
  socials: [
    {
      platform: 'GitHub',
      label: 'Open Source & Repositories',
      url: 'https://github.com/razeequtama',
      handle: 'github.com/razeequtama',
    },
    {
      platform: 'LinkedIn',
      label: 'Professional Profile',
      url: 'https://www.linkedin.com/in/raziqrabbaniutama/',
      handle: 'linkedin.com/in/raziqrabbaniutama',
    },
  ],
};
