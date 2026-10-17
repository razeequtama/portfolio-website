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
   Follow the developer instructions in comments to customize content easily.
   ========================================================================= */

/* === CHANGE HERE: Developer Profile & Quick Stats === */
export const developerProfile: DeveloperProfile = {
  name: 'Alex Mercer',
  role: 'Staff Systems & Frontend Architect',
  status: 'Open to select high-impact advisory & senior roles',
  location: 'San Francisco, CA (Remote)',
  yearsExperience: '8+ Years',
  projectsShipped: '35+ Apps',
  systemReliability: '99.99%',
};

/* === CHANGE HERE: Section Definitions (Must stay 7 items in the circular carousel) === */
export const portfolioSections: SectionMeta[] = [
  {
    id: 'welcome',
    index: 0,
    number: '01',
    title: 'WELCOME',
    subtitle: 'Introduction and professional summary',
    shortDesc: 'Hero introduction, bio summary, quick callouts, and key links.',
    badge: 'Overview',
  },
  {
    id: 'projects',
    index: 1,
    number: '02',
    title: 'PROJECTS',
    subtitle: 'Featured projects and case studies',
    shortDesc: 'Full stack applications, systems tools, and developer platforms.',
    badge: 'Work',
  },
  {
    id: 'engineering',
    index: 2,
    number: '03',
    title: 'ENGINEERING',
    subtitle: 'Architecture and technical decisions',
    shortDesc: 'Design philosophies, event architectures, and system patterns.',
    badge: 'Deep Dive',
  },
  {
    id: 'experience',
    index: 3,
    number: '04',
    title: 'EXPERIENCE',
    subtitle: 'Work, academic, and relevant experience',
    shortDesc: 'Career trajectory, leadership impact, and milestones.',
    badge: 'Timeline',
  },
  {
    id: 'tech-stack',
    index: 4,
    number: '05',
    title: 'TECH STACK',
    subtitle: 'Languages, frameworks, and tools',
    shortDesc: 'Frontend, backend, cloud infra, and database proficiencies.',
    badge: 'Skills',
  },
  {
    id: 'about',
    index: 5,
    number: '06',
    title: 'ABOUT ME',
    subtitle: 'Background, interests, and goals',
    shortDesc: 'Personal values, engineering mindset, and passions outside code.',
    badge: 'Personal',
  },
  {
    id: 'contact',
    index: 6,
    number: '07',
    title: 'CONTACT',
    subtitle: 'Email, LinkedIn, GitHub, and CV',
    shortDesc: 'Direct channels, CV download, and message submission skeleton.',
    badge: 'Connect',
  },
];

/* =========================================================================
   02. PROJECTS DATA
   ========================================================================= */
export const projectsData: ProjectItem[] = [
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Project === */
  {
    id: 'pulse-distributed-cache',
    title: 'Pulse L2 Memory Grid',
    subtitle: 'Ultra-low latency replicated key-value storage engine',
    description:
      'Engineered a distributed cache layer with consistent hashing, lockless ring buffers, and sub-millisecond p99 latency under concurrent write storms.',
    category: 'Systems',
    techStack: ['TypeScript', 'Rust', 'WebAssembly', 'gRPC', 'Docker'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveUrl: 'https://example.com/pulse-preview',
    githubUrl: 'https://github.com/example/pulse-cache',
    metrics: ['< 1.2ms p99 read latency', '100k+ ops/sec throughput', 'Zero-downtime replication'],
    architectureNotes: 'Custom Raft consensus protocol variant optimized for single-datacenter mesh clusters.',
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Project === */
  {
    id: 'horizon-ui-design-system',
    title: 'Horizon Design Core',
    subtitle: 'Enterprise component system with headless primitives',
    description:
      'A multi-brand design system powering 14 production web applications with accessible keyboard behaviors, automated visual regression tests, and zero runtime CSS overhead.',
    category: 'Frontend',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Storybook', 'Figma API'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
    liveUrl: 'https://example.com/horizon-ds',
    githubUrl: 'https://github.com/example/horizon-design-system',
    metrics: ['100% WCAG 2.1 AA compliant', '350+ components', '14 teams onboarded'],
    architectureNotes: 'Compound component pattern with decoupled state machines and polymorphic slots.',
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Project === */
  {
    id: 'strata-observability-mesh',
    title: 'Strata Distributed Tracing',
    subtitle: 'Real-time telemetry and APM aggregation pipeline',
    description:
      'High-throughput telemetry ingestion platform processing billions of trace spans per day with adaptive sampling and automated bottleneck root-cause detection.',
    category: 'Cloud',
    techStack: ['TypeScript', 'Go', 'Kafka', 'ClickHouse', 'OpenTelemetry'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #14532d 0%, #064e3b 100%)',
    liveUrl: 'https://example.com/strata-apm',
    githubUrl: 'https://github.com/example/strata-apm',
    metrics: ['2.4B events/day processed', '94% compression ratio', '60% infra cost reduction'],
    architectureNotes: 'Vectorized ClickHouse schema partitioned on day and service hash.',
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Project === */
  {
    id: 'flux-compiler-ast',
    title: 'Flux AST Optimizer',
    subtitle: 'Incremental static analysis & dead code pruner',
    description:
      'Compiler toolchain plugin performing tree-shaking analysis on dynamic module boundaries, trimming unused graph nodes and accelerating incremental bundling.',
    category: 'DevTools',
    techStack: ['TypeScript', 'Node.js', 'Babel AST', 'Vitest'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #701a75 0%, #4a044e 100%)',
    liveUrl: 'https://example.com/flux-ast',
    githubUrl: 'https://github.com/example/flux-compiler-ast',
    metrics: ['3.4x faster build cycles', '22% average bundle size reduction'],
    architectureNotes: 'Single-pass topological sort with incremental cache invalidation.',
  },
];

/* =========================================================================
   03. ENGINEERING PATTERNS & ARCHITECTURAL DECISIONS
   ========================================================================= */
export const engineeringPatterns: ArchitecturePattern[] = [
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Architecture Pattern === */
  {
    id: 'event-driven-cqrs',
    title: 'Event-Driven CQRS with Pragmatic Optimism',
    category: 'System Architecture',
    tagline: 'Decoupling command write models from high-throughput read projections',
    overview:
      'For complex transactional applications, unifying read and write queries creates contention and tight schema coupling. By separating commands from queries via an event log, read models can be tailored into denormalized fast-read caches.',
    keyDecisions: [
      'Commands validate domain invariants synchronously, returning an optimistic event ID immediately.',
      'Background projection workers update read replicas idempotently via event sequence numbers.',
      'UI applies optimistic state rollbacks only on explicit rejected transaction signals.',
    ],
    tradeoffs: {
      pros: [
        'Massive horizontal scaling of read replicas without database write lock bottlenecks',
        'Auditability: every mutation is an immutable event in the domain timeline',
      ],
      cons: [
        'Eventual consistency latency requires careful client-side optimistic UI handling',
        'Increased infrastructure complexity compared to standard ACID relational transactions',
      ],
    },
    codeSample: {
      filename: 'command-dispatcher.ts',
      language: 'typescript',
      code: `export async function dispatchCommand<T extends DomainEvent>(
  command: CommandPayload,
  eventStore: EventStoreClient
): Promise<CommandResult> {
  // 1. Verify schema & invariant guards
  const state = await eventStore.loadAggregate(command.aggregateId);
  state.validateInvariant(command);

  // 2. Commit immutable event to append-only log
  const event = state.produceEvent(command);
  await eventStore.append(event);

  // 3. Fire optimistic projection hint
  projectionWorker.enqueueHint(event.id);
  return { status: 'committed', eventId: event.id };
}`,
    },
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Architecture Pattern === */
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
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Experience Milestone === */
  {
    id: 'exp-staff-architect',
    role: 'Staff Systems & Frontend Architect',
    company: 'Nexus Platforms Inc.',
    period: '2023 - Present',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-Time',
    summary:
      'Directing core architecture across 4 global engineering squads. Leading the modernization of our real-time collaborative workspace and low-latency client engine.',
    achievements: [
      'Decreased initial load time by 48% across 1.8M active daily sessions using streaming SSR and asset graph optimization.',
      'Authored the cross-team RFC that unified 5 disparate internal state libraries into a single observable store.',
      'Mentored 12 senior engineers across performance profiling, concurrency patterns, and system design.',
    ],
    techStack: ['TypeScript', 'React 19', 'Next.js', 'Rust', 'WebSockets', 'GraphQL'],
    featuredBadge: 'Current Role',
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Experience Milestone === */
  {
    id: 'exp-senior-fullstack',
    role: 'Senior Full Stack Engineer',
    company: 'Vanguard Data Systems',
    period: '2020 - 2023',
    location: 'Seattle, WA',
    type: 'Full-Time',
    summary:
      'Architected distributed workflow orchestration tools and high-volume data visualization dashboards for enterprise cloud monitoring.',
    achievements: [
      'Built a custom canvas-based graph rendering engine handling 50,000+ interactive nodes with 60fps pan/zoom.',
      'Reduced cloud infrastructure costs by $140,000/year through intelligent query batching and read-replica caching.',
      'Pioneered automated end-to-end integration test harnesses, cutting regression bug reports by 35%.',
    ],
    techStack: ['TypeScript', 'Node.js', 'React', 'Docker', 'PostgreSQL', 'Redis'],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Experience Milestone === */
  {
    id: 'exp-software-engineer',
    role: 'Software Engineer',
    company: 'Apex Cloud Labs',
    period: '2018 - 2020',
    location: 'Austin, TX',
    type: 'Full-Time',
    summary:
      'Developed microservices and customer-facing management dashboards for container orchestration products.',
    achievements: [
      'Implemented OAuth2 / OIDC authentication flows and role-based access control (RBAC).',
      'Migrated legacy monolithic frontend codebase into modular TypeScript packages.',
    ],
    techStack: ['JavaScript', 'TypeScript', 'Vue.js', 'Go', 'Kubernetes'],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Experience Milestone === */
  {
    id: 'exp-education',
    role: 'B.S. in Computer Science (Summa Cum Laude)',
    company: 'University of Texas at Austin',
    period: '2014 - 2018',
    location: 'Austin, TX',
    type: 'Education',
    summary:
      'Concentration in Distributed Systems and Computer Architecture. Published undergraduate research on peer-to-peer gossip protocols.',
    achievements: [
      'Departmental Honors Thesis on Resilient Epidemic Dissemination Protocols.',
      'President of ACM Student Chapter; organized 3 campus hackathons.',
    ],
    techStack: ['C / C++', 'Java', 'Python', 'Algorithms', 'Distributed Systems'],
  },
];

/* =========================================================================
   05. TECH STACK & PROFICIENCY DATA
   ========================================================================= */
export const skillCategories: SkillCategory[] = [
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category === */
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    description: 'Modern component architectures, UI performance, and state machines',
    skills: [
      { name: 'TypeScript', level: 98, experienceYears: '7 yrs', highlight: 'Strict Typing, AST, Compiler API' },
      { name: 'React & Ecosystem', level: 95, experienceYears: '8 yrs', highlight: 'Hooks, RSC, Fiber internals, State' },
      { name: 'Next.js & Vite', level: 92, experienceYears: '5 yrs', highlight: 'SSR, SSG, Bundler optimizations' },
      { name: 'HTML5 & Modern CSS', level: 94, experienceYears: '8 yrs', highlight: 'CSS Variables, Grid, Subgrid, Canvas' },
      { name: 'State Management', level: 90, experienceYears: '6 yrs', highlight: 'Zustand, Redux Toolkit, Signals, TanStack' },
    ],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category === */
  {
    id: 'backend',
    name: 'Backend & APIs',
    description: 'High-throughput services, distributed concurrency, and API contracts',
    skills: [
      { name: 'Node.js & Bun', level: 92, experienceYears: '7 yrs', highlight: 'Event loop tuning, Worker threads, Streams' },
      { name: 'Go (Golang)', level: 85, experienceYears: '4 yrs', highlight: 'Goroutines, Channels, microservices' },
      { name: 'Rust (Systems)', level: 78, experienceYears: '3 yrs', highlight: 'Ownership model, WebAssembly compilation' },
      { name: 'gRPC & REST & GraphQL', level: 92, experienceYears: '6 yrs', highlight: 'Protobuf schemas, schema stitching' },
    ],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category === */
  {
    id: 'databases',
    name: 'Databases & In-Memory',
    description: 'Relational data modeling, distributed storage, and caching tiers',
    skills: [
      { name: 'PostgreSQL', level: 90, experienceYears: '6 yrs', highlight: 'Complex indexing, EXPLAIN ANALYZE, WAL' },
      { name: 'Redis', level: 92, experienceYears: '6 yrs', highlight: 'Pub/Sub, Lua scripts, cluster mode' },
      { name: 'ClickHouse', level: 80, experienceYears: '3 yrs', highlight: 'Analytical time-series columnar queries' },
      { name: 'Prisma & Drizzle', level: 88, experienceYears: '4 yrs', highlight: 'Type-safe relational migrations' },
    ],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category === */
  {
    id: 'devops',
    name: 'DevOps & Cloud Infra',
    description: 'Containerization, continuous delivery pipelines, and cloud observability',
    skills: [
      { name: 'Docker & OCI Containers', level: 92, experienceYears: '6 yrs', highlight: 'Multi-stage lean builds, rootless' },
      { name: 'Kubernetes', level: 82, experienceYears: '4 yrs', highlight: 'Ingress, ConfigMaps, Helm charts' },
      { name: 'AWS & Cloudflare Edge', level: 88, experienceYears: '5 yrs', highlight: 'Workers, ECS, Lambda, CloudFront' },
      { name: 'CI/CD (GitHub Actions)', level: 94, experienceYears: '6 yrs', highlight: 'Matrix test suites, caching, release bots' },
    ],
  },
  /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Skill Category === */
  {
    id: 'tools',
    name: 'Testing & Developer Tooling',
    description: 'Quality assurance, automated verification, and profiling instrumentation',
    skills: [
      { name: 'Vitest & Jest', level: 95, experienceYears: '6 yrs', highlight: 'Unit & integration test architecture' },
      { name: 'Playwright & Cypress', level: 90, experienceYears: '4 yrs', highlight: 'Resilient end-to-end browser journeys' },
      { name: 'Chrome DevTools & Perf Profiling', level: 94, experienceYears: '7 yrs', highlight: 'Memory leaks, flamegraphs, layout shifts' },
      { name: 'Git & Trunk-Based Development', level: 95, experienceYears: '8 yrs', highlight: 'Rebase workflows, bisect, monorepos' },
    ],
  },
];

/* =========================================================================
   06. ABOUT ME DATA
   ========================================================================= */
export const aboutData: AboutContent = {
  /* === CHANGE HERE: Main Narrative Intro === */
  headline: 'Building software that is reliable, elegant, and engineered to endure.',
  bioParagraphs: [
    'I am a software engineer with over 8 years of experience designing high-scale web platforms and developer tooling. My focus sits at the intersection of robust systems engineering and nuanced, fluid frontend user experiences.',
    'I believe that great engineering is as much about what you leave out as what you build in. Simplicity, deterministic state transitions, clear boundaries, and comprehensive type guarantees are the foundations of systems that can grow over years without collapsing under tech debt.',
    'When I am not deep in profiling traces or writing TypeScript, you will find me restoring vintage audio hardware, experimenting with mechanical keyboards, and climbing outdoors.',
  ],
  personalInterests: [
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Personal Interest === */
    {
      title: 'Analog Audio & Vinyl Turntables',
      description: 'Restoring direct-drive turntables and studying mechanical precision acoustics.',
      detail: 'Tuning tonearms, cartridge tracking force, and tube preamps.',
      tag: 'Craft',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Personal Interest === */
    {
      title: 'Mechanical Keyboards & Firmware',
      description: 'Custom soldering split ergonomic keyboards with QMK/ZMK firmware macros.',
      detail: 'Lubed switches, acoustic dampening, custom layout mappings.',
      tag: 'Hardware',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Personal Interest === */
    {
      title: 'Rock Climbing & Bouldering',
      description: 'Physical problem-solving on granite and indoor competition problems.',
      detail: 'Route reading, dynamic balance, mental resilience under fatigue.',
      tag: 'Athletics',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Personal Interest === */
    {
      title: 'Technical Writing & Open Source',
      description: 'Distilling complex architectural trade-offs into readable RFCs and guides.',
      detail: 'Authoring deep-dives on concurrency, caching, and state synchronization.',
      tag: 'Community',
    },
  ],
  coreValues: [
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Core Value === */
    {
      title: 'Clarity Over Cleverness',
      tagline: 'Code is read 10x more often than written.',
      description: 'Write explicit, discoverable code with obvious error paths rather than terse clever tricks.',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Core Value === */
    {
      title: 'Fast Feedback Loops',
      tagline: 'Speed of iteration defines engineering leverage.',
      description: 'Invest heavily in rapid test suites, deterministic builds, and clear telemetry.',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Core Value === */
    {
      title: 'User-Centric Rigor',
      tagline: 'Performance and accessibility are core features.',
      description: 'Never sacrifice responsiveness, keyboard access, or visual stability for aesthetic shortcuts.',
    },
  ],
  careerTrajectory: [
    'Exploring autonomous agentic workflows and local-first browser databases.',
    'Writing more systems code in Rust for edge compute environments.',
    'Continuing to mentor and champion thoughtful engineering craftsmanship.',
  ],
};

/* =========================================================================
   07. CONTACT DATA
   ========================================================================= */
export const contactData: ContactContent = {
  /* === CHANGE HERE: Direct Contact Info === */
  email: 'alex.mercer.dev@example.com',
  location: 'San Francisco, CA (PST / UTC-8)',
  availability: 'Available for Q2/Q3 high-impact roles & technical consulting',
  responseTime: 'Within 24 business hours',
  resumeUrl: '#download-cv',
  socials: [
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Social Link === */
    {
      platform: 'GitHub',
      label: 'Open Source Repositories',
      url: 'https://github.com/example',
      handle: 'github.com/example',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Social Link === */
    {
      platform: 'LinkedIn',
      label: 'Professional Network',
      url: 'https://linkedin.com/in/example',
      handle: 'linkedin.com/in/alex-mercer',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Social Link === */
    {
      platform: 'X (Twitter)',
      label: 'Technical Thoughts & Notes',
      url: 'https://x.com/example',
      handle: '@alex_dev_systems',
    },
    /* === DUPLICATE THIS BLOCK OF CODE TO ADD A NEW Social Link === */
    {
      platform: 'Substack',
      label: 'Engineering Newsletter',
      url: 'https://example.substack.com',
      handle: 'systems-unwound.substack.com',
    },
  ],
};

