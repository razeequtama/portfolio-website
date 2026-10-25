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
    subtitle: '',
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
    subtitle: 'Featured software projects and builds.',
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
    subtitle: '',
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
    subtitle: '',
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
    subtitle: '',
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
    subtitle: '',
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
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'FastAPI', 'Scikit-learn', 'Tailwind CSS'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/mercury-demand-intelligence',
    videoDemoUrl: '/video_demos/mercury_video_demo.mp4',
    snapshotUrl: '/snapshots/mercury_snapshot.avif',
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
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'SQLAlchemy', 'NetworkX', 'PostgreSQL', 'Redis', 'Scikit-learn'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/aegis-fraud-detection',
    videoDemoUrl: '/video_demos/aegis_video_demo.mp4',
    snapshotUrl: '/snapshots/aegis_snapshot.avif',
    metrics: ['Async non-blocking I/O', 'Automated OpenAPI docs', 'Dockerized deployment'],
    architectureNotes: 'Repository pattern isolating data access operations from business validation endpoints.',
  },
  {
    id: 'corecraft-memory-engine',
    title: 'Lux',
    subtitle: 'Data Observability Platform',
    description:
      'Lux is an evidence-based data observability and data quality validation platform built for analytics engineers, and data consumers. It evaluates datasets against deterministic quality rules, maps multi-tier upstream-to-downstream lineage DAGs, and coordinates structured incident investigations with cryptographically verifiable audit reports.',
    category: 'Systems',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Flow', 'Python', 'FastAPI', 'SQLite WAL', 'SQLAlchemy', 'NetworkX', 'Alpine', 'Pytest', 'Vitest'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/lux-data-observability',
    videoDemoUrl: '/video_demos/lux_video_demo.mp4',
    snapshotUrl: '/snapshots/lux_snapshot.avif',
    metrics: ['Zero memory leaks verified', 'O(1) circular buffer ops', 'Strict compiler warnings'],
    architectureNotes: 'RAII idiom ensuring deterministic deallocation and explicit ownership semantics.',
  },
];

/* =========================================================================
   04. EXPERIENCE TIMELINE DATA
   ========================================================================= */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-lab-assistant-binus',
    role: 'Laboratory Assistant of Bina Nusantara University',
    location: 'Kota Bekasi, Indonesia',
    image: '/experience_pictures/lab_assistant.avif',
    period: 'February 2026 - Present',
    achievements: [
      'Supported and facilitated 44 laboratory sessions across Full-Stack Development, Algorithms, and Computational Physics, providing technical guidance and hands-on assistance to students in completing coursework, implementing programming solutions, and applying discipline-specific concepts.',
      'Guided students through programming exercises and technical assignments by breaking down complex concepts into clear, actionable implementation steps, enabling them to develop a stronger understanding of programming fundamentals, algorithmic thinking, and computational methodologies.',
      'Diagnosed, analyzed, and assisted in resolving programming errors, logical inconsistencies, and implementation issues, helping students strengthen their debugging techniques, analytical reasoning, and independent problem-solving capabilities.',
      'Facilitated practical, hands-on learning experiences by bridging theoretical knowledge with real-world technical applications, encouraging students to translate abstract concepts into functional code, algorithmic solutions, and computational implementations.',
      'Assisted students in understanding software development workflows, algorithm design principles, and computational problem-solving techniques, reinforcing their ability to approach technical challenges systematically and develop reliable solutions.',
    ],
    techStack: [
      'Algorithms',
      'Data Structures',
      'Computational Physics',
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'C',
      'C++',
      'PHP',
      'MySQL',
    ],
  },
  {
    id: 'exp-assistant-manager-bnec',
    role: 'Assistant Manager of Bina Nusantara University English Club (BNEC) Brand Management Division',
    location: 'Kota Bekasi, Indonesia',
    image: '/experience_pictures/assistant_manager.avif',
    period: 'September 2026 - Present',
    achievements: [
      'Coordinated club activities and organizational initiatives, supporting project execution and alignment with organizational objectives.',
      'Oversaw the production of 50+ club design assets, maintaining visual consistency and adherence to established design standards.',
      'Served as Vice Project Manager for The Extraordinary Festival Seminar, Workshop, and Talkshow, supporting cross-functional coordination and event execution.',
      'Led the Design Division for New Member Recruitment and the Welcoming Party, coordinating design deliverables and ensuring consistency across organizational events.',
    ],
  },
];

/* =========================================================================
   05. TECH STACK & PROFICIENCY DATA
   ========================================================================= */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Programming Languages',
    skills: [
      { name: 'Python', color: '#3776AB' },
      { name: 'C', color: '#659AD2' },
      { name: 'C++', color: '#00599C' },
      { name: 'Java', color: '#EA2D2E' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'SQL', color: '#00BCF2' },
      { name: 'PHP', color: '#777BB4' },
      { name: 'HTML5', color: '#E34F26' },
      { name: 'CSS3', color: '#1572B6' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#FFFFFF' },
      { name: 'Vite', color: '#BD34FE' },
      { name: 'Tailwind CSS', color: '#38BDF8' },
      { name: 'Alpine.js', color: '#8BC0D0' },
      { name: 'React Flow', color: '#FF0072' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', color: '#5FA04E' },
      { name: 'Express.js', color: '#EEEEEE' },
      { name: 'FastAPI', color: '#05998B' },
      { name: 'SQLAlchemy', color: '#D71F00' },
      { name: 'NetworkX', color: '#FF7F0E' },
    ],
  },
  {
    id: 'databases-ml',
    name: 'Databases & Machine Learning',
    skills: [
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'MySQL', color: '#F29111' },
      { name: 'SQLite (WAL mode)', color: '#0080CD' },
      { name: 'Redis', color: '#FF4438' },
      { name: 'Neon', color: '#00E599' },
      { name: 'Scikit-learn', color: '#F7931E' },
      { name: 'PyTorch', color: '#EE4C2C' },
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'NumPy', color: '#4DABCF' },
      { name: 'Pandas', color: '#E70488' },
    ],
  },
  {
    id: 'tools-devops',
    name: 'Tools, Testing & Deployment',
    skills: [
      { name: 'Git', color: '#F05032' },
      { name: 'GitHub', color: '#F0F6FC' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Linux', color: '#FCC624' },
      { name: 'Pytest', color: '#0A9EDC' },
      { name: 'Vitest', color: '#FCC72B' },
      { name: 'Railway', color: '#9B51E0' },
      { name: 'Render', color: '#46E3B7' },
    ],
  },
];

/* =========================================================================
   06. ABOUT ME DATA
   ========================================================================= */
export const aboutData: AboutContent = {
  bioParagraphs: [
    "I'm a Software Engineering student at BINUS University with a strong interest in building software that solves real-world problems. I enjoy working across the full stack, from designing intuitive user interfaces to engineering backend systems and data-driven solutions.",
    "Through projects like Mercury, Aegis, and Lux, I've developed a deeper appreciation for what makes software effective beyond simply working. Performance, reliability, accuracy, and maintainability are integral to the engineering process. I approach problems analytically and iteratively, breaking down complexity, investigating solutions, and continuously refining my work.",
    "Beyond engineering, I have a strong passion for design, particularly UI/UX, typography, and visual systems. I enjoy bringing technical functionality and visual clarity together to create software that is both well-engineered and intuitive to use.",
    "I'm currently seeking a software engineering internship where I can contribute to meaningful projects, learn from experienced engineers, and continue developing my ability to build effective, reliable, and scalable software.",
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
