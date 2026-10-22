import type {
  SectionMeta,
  DeveloperProfile,
  ProjectItem,
  ArchitecturePattern,
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
    title: 'ENGINEERING',
    subtitle: 'Architecture and technical decisions',
    shortDesc: 'Design patterns, clean code philosophy, and interactive mathematics.',
    badge: 'Deep Dive',
  },
  {
    id: 'projects',
    index: 2,
    number: '03',
    cardSuit: 'diamonds',
    cardRank: '3',
    title: 'PROJECTS',
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
    title: 'CONTACT',
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
    title: 'OmniTrack Workflow Platform',
    subtitle: 'Full-stack task management & collaboration dashboard',
    description:
      'Engineered an end-to-end task management and productivity dashboard featuring responsive UI components, user authentication, role-based project workspaces, and persistent database storage.',
    category: 'Full Stack',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama',
    metrics: ['Role-based access control', 'Type-safe API contracts', 'Fully responsive UI'],
    architectureNotes: 'Decoupled modular architecture separating presentation components from API data fetching hooks.',
  },
  {
    id: 'fastapi-pulse-service',
    title: 'Pulse Analytics REST API',
    subtitle: 'Asynchronous backend microservice with automated validation',
    description:
      'Designed and built an asynchronous backend service using Python and FastAPI, featuring automated schema validation with Pydantic, structured SQL database queries, and interactive Swagger OpenAPI documentation.',
    category: 'Cloud',
    techStack: ['Python', 'FastAPI', 'SQL', 'Docker', 'Postman'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama',
    metrics: ['Async non-blocking I/O', 'Automated OpenAPI docs', 'Dockerized deployment'],
    architectureNotes: 'Repository pattern isolating data access operations from business validation endpoints.',
  },
  {
    id: 'corecraft-memory-engine',
    title: 'CoreCraft Systems Buffer',
    subtitle: 'High-performance C++ circular buffer & data structure library',
    description:
      'Implemented a modular C++ systems library exploring manual memory allocation, custom circular ring buffers, and cache-friendly data structures with deterministic performance and clean resource cleanup.',
    category: 'Systems',
    techStack: ['C++', 'Linux', 'Bash', 'Makefile'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama',
    metrics: ['Zero memory leaks verified', 'O(1) circular buffer ops', 'Strict compiler warnings'],
    architectureNotes: 'RAII idiom ensuring deterministic deallocation and explicit ownership semantics.',
  },
  {
    id: 'aura-interactive-ui',
    title: 'Aura Interactive Web Lab',
    subtitle: 'Fluid interactive user interface and physics playground',
    description:
      'Created a fluid, responsive interactive web application exploring 60fps animations, custom coordinate physics, accessible keyboard navigation, and dynamic dark/light theme customization.',
    category: 'Frontend',
    techStack: ['React', 'TypeScript', 'Vite', 'HTML5 & CSS3'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #701a75 0%, #4a044e 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama',
    metrics: ['60 FPS smooth rendering', 'WCAG accessible navigation', 'Responsive mobile-first'],
    architectureNotes: 'Pure mathematical coordinate mapping without DOM cloning or layout thrashing.',
  },
];

/* =========================================================================
   03. ENGINEERING PATTERNS & ARCHITECTURAL DECISIONS
   ========================================================================= */
export const engineeringPatterns: ArchitecturePattern[] = [
  {
    id: 'clean-architecture-service',
    title: 'Layered Separation of Concerns & Clean Contracts',
    category: 'Software Architecture',
    tagline: 'Decoupling presentation, business validation, and database operations',
    overview:
      'In building sustainable full-stack applications, directly coupling route handlers or UI components to database drivers leads to fragile code. By establishing explicit interfaces and separating business domain models from external drivers, code remains modular, discoverable, and easily testable.',
    keyDecisions: [
      'Strict input validation at boundaries via typed schemas (e.g., Pydantic in FastAPI or Zod in TypeScript).',
      'Encapsulate database queries inside isolated repository functions rather than inlining them in request handlers.',
      'Treat domain errors as explicit typed results rather than relying on uncontrolled runtime exceptions.',
    ],
    tradeoffs: {
      pros: [
        'High testability: business logic can be unit-tested without mocking entire database instances',
        'Maintainability: database schemas or UI libraries can be refactored without breaking core business logic',
      ],
      cons: [
        'Requires writing explicit interface definitions and mapping layers between database and DTO models',
      ],
    },
    codeSample: {
      filename: 'user-service.ts',
      language: 'typescript',
      code: `export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(userData: CreateUserDTO): Promise<User>;
}

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(dto: CreateUserDTO): Promise<ServiceResult<User>> {
    // 1. Domain invariant validation
    if (!dto.email.includes('@')) {
      return { success: false, error: 'InvalidEmailFormat' };
    }

    // 2. Persist via repository interface
    const newUser = await this.userRepo.create(dto);
    return { success: true, data: newUser };
  }
}`,
    },
  },
  {
    id: 'resilient-resync-turntable',
    title: 'Circular Polar Coordinate State Normalization',
    category: 'Frontend Engineering',
    tagline: 'Infinite carousel physics with continuous modular wrap-around',
    overview:
      'Implementing infinite circular navigation docks often suffers from jarring reset glitches. Using continuous angular coordinates with modular relative offset mapping yields seamless, jitter-free physics without DOM cloning.',
    keyDecisions: [
      'Maintain an unconstrained continuous rotation angle (in degrees) updated by drag delta or discrete step triggers.',
      'Map each card to the shortest wrapped angular difference: diff = ((i - activeFloat + 3.5) % 7) - 3.5.',
      'Mount radially via CSS transform: rotate(netAngle) translateY(-radius) scale(scale).',
    ],
    tradeoffs: {
      pros: [
        'Zero duplicate DOM nodes needed for circular infinite scrolling',
        'Hardware-accelerated transforms for 60/120fps fluid interaction',
      ],
      cons: [
        'Requires trigonometric radius calibration for multiple responsive screen widths',
      ],
    },
    codeSample: {
      filename: 'turntable-math.ts',
      language: 'typescript',
      code: `export function calculateCardPlacement(
  index: number,
  activeContinuousIndex: number,
  totalItems: number = 7,
  stepAngle: number = 26,
  radius: number = 420
) {
  // Compute shortest wrapped angular distance
  let diff = ((index - activeContinuousIndex) % totalItems + totalItems) % totalItems;
  if (diff > totalItems / 2) diff -= totalItems;

  const netAngle = diff * stepAngle;
  const isApex = Math.abs(netAngle) < 1.0;
  const scale = Math.max(0.65, 1 - Math.abs(diff) * 0.12);
  const opacity = Math.abs(netAngle) > 85 ? 0 : Math.max(0.2, 1 - Math.abs(diff) * 0.25);

  return { netAngle, scale, opacity, isApex, zIndex: Math.round(10 - Math.abs(diff) * 2) };
}`,
    },
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
