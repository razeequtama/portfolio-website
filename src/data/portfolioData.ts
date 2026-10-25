import type {
  SectionMeta,
  DeveloperProfile,
  ProjectItem,
  ExperienceItem,
  SkillCategory,
  AboutContent,
  ContactContent,
} from '../types/portfolio';
import type { Language } from '../context/LanguageContext';

export const developerProfileEN: DeveloperProfile = {
  name: 'Raziq Rabbani Utama',
  role: 'Software Engineer',
  status: 'Actively seeking Software Engineering Internship opportunities',
  location: 'Kota Bekasi, Jawa Barat, Indonesia',
  yearsExperience: 'CS & Systems',
  projectsShipped: 'Full-Stack',
  systemReliability: 'Available',
};

export const developerProfileID: DeveloperProfile = {
  name: 'Raziq Rabbani Utama',
  role: 'Software Engineer',
  status: 'Aktif mencari kesempatan Magang (Internship) Software Engineering',
  location: 'Kota Bekasi, Jawa Barat, Indonesia',
  yearsExperience: 'CS & Sistem',
  projectsShipped: 'Full-Stack',
  systemReliability: 'Tersedia',
};

export const developerProfile: DeveloperProfile = developerProfileEN;

export const portfolioSectionsEN: SectionMeta[] = [
  {
    id: 'welcome',
    index: 0,
    number: '01',
    cardSuit: 'hearts',
    cardRank: 'A',
    title: 'WELCOME',
    subtitle: 'Introduction and candidate summary.',
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
    subtitle: 'Core principles behind my engineering approach.',
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
    title: 'MY EXPERIENCES',
    subtitle: 'My learning journey and engineering experience.',
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
    subtitle: 'Tools and technologies I work with.',
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
    subtitle: 'My interests, mindset, and career aspirations.',
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
    subtitle: 'Get in touch for opportunities and collaboration.',
    shortDesc: 'Direct email, GitHub, LinkedIn, and collaboration inquiries.',
    badge: 'Connect',
  },
];

export const portfolioSectionsID: SectionMeta[] = [
  {
    id: 'welcome',
    index: 0,
    number: '01',
    cardSuit: 'hearts',
    cardRank: 'A',
    title: 'SELAMAT DATANG',
    subtitle: 'Pengenalan dan ringkasan profil kandidat.',
    shortDesc: 'Pengenalan utama, fokus teknis, metrik sekilas, dan tautan penting.',
    badge: 'Ringkasan',
  },
  {
    id: 'engineering',
    index: 1,
    number: '02',
    cardSuit: 'spades',
    cardRank: '2',
    title: 'FOKUS REKAYASA',
    subtitle: 'Prinsip utama dalam pendekatan rekayasa perangkat lunak saya.',
    shortDesc: 'Kesesuaian masalah, implementasi matang, dan ketepatan dengan batasan jelas.',
    badge: 'Prinsip',
  },
  {
    id: 'projects',
    index: 2,
    number: '03',
    cardSuit: 'diamonds',
    cardRank: '3',
    title: 'PROYEK SAYA',
    subtitle: 'Proyek dan karya perangkat lunak unggulan.',
    shortDesc: 'Aplikasi web full-stack, backend FastAPI, dan utilitas sistem.',
    badge: 'Karya',
  },
  {
    id: 'experience',
    index: 3,
    number: '04',
    cardSuit: 'clubs',
    cardRank: '4',
    title: 'PENGALAMAN SAYA',
    subtitle: 'Perjalanan belajar dan pengalaman rekayasa perangkat lunak.',
    shortDesc: 'Trajektori pendidikan, fondasi akademik, dan eksplorasi mandiri.',
    badge: 'Linimasa',
  },
  {
    id: 'tech-stack',
    index: 4,
    number: '05',
    cardSuit: 'hearts',
    cardRank: '5',
    title: 'TECH STACK',
    subtitle: 'Alat dan teknologi yang saya gunakan.',
    shortDesc: 'Frontend, backend, basis data, dan lingkungan Linux.',
    badge: 'Keahlian',
  },
  {
    id: 'about',
    index: 5,
    number: '06',
    cardSuit: 'clubs',
    cardRank: '6',
    title: 'TENTANG SAYA',
    subtitle: 'Minat, pola pikir, dan aspirasi karier saya.',
    shortDesc: 'Filosofi rekayasa, rasa ingin tahu di luar kode, dan tujuan karier.',
    badge: 'Pribadi',
  },
  {
    id: 'contact',
    index: 6,
    number: '07',
    cardSuit: 'diamonds',
    cardRank: '7',
    title: 'HUBUNGI SAYA',
    subtitle: 'Mari terhubung untuk peluang magang dan kolaborasi.',
    shortDesc: 'Email langsung, GitHub, LinkedIn, dan diskusi kolaborasi.',
    badge: 'Kontak',
  },
];

export const portfolioSections: SectionMeta[] = portfolioSectionsEN;

export const projectsDataEN: ProjectItem[] = [
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

export const projectsDataID: ProjectItem[] = [
  {
    id: 'omnitrack-task-hub',
    title: 'MERCURY',
    subtitle: 'Kecerdasan Permintaan Pasar Real-Time',
    description:
      'Mercury adalah command center kecerdasan niaga end-to-end yang mengubah data transaksi mentah, tingkat inventaris, dan pergeseran pasar kompetitor menjadi keputusan operasional yang dapat diaudit. Mengintegrasikan frontend Next.js 16 responsif, API gateway Express 5, basis data relasional PostgreSQL 16, dan microservice Python FastAPI dengan regresi linier kontinu Scikit-Learn.',
    category: 'Full Stack',
    techStack: ['Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'FastAPI', 'Scikit-learn', 'Tailwind CSS'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/mercury-demand-intelligence',
    videoDemoUrl: '/video_demos/mercury_video_demo.mp4',
    snapshotUrl: '/snapshots/mercury_snapshot.avif',
    metrics: ['Role-based access control', 'Kontrak API type-safe', 'UI sepenuhnya responsif'],
    architectureNotes: 'Arsitektur modular terpisah antara komponen presentasi dan hooks pengambil data API.',
  },
  {
    id: 'fastapi-pulse-service',
    title: 'AEGIS',
    subtitle: 'Platform Deteksi Penipuan Keuangan & Analisis Graf',
    description:
      'Aegis adalah platform pendeteksi penipuan transaksi kelas enterprise, penilaian anomali perilaku, analisis jaringan relasi graf (entity network graph), serta manajemen kasus analisis yang ditenagai oleh Machine Learning dan Redis.',
    category: 'Cloud',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'SQLAlchemy', 'NetworkX', 'PostgreSQL', 'Redis', 'Scikit-learn'],
    featured: true,
    previewGradient: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/aegis-fraud-detection',
    videoDemoUrl: '/video_demos/aegis_video_demo.mp4',
    snapshotUrl: '/snapshots/aegis_snapshot.avif',
    metrics: ['I/O non-blocking asinkron', 'Dokumentasi otomatis OpenAPI', 'Deployment ter-Dockerisasi'],
    architectureNotes: 'Pola repositori yang mengisolasi akses data dari endpoint validasi bisnis.',
  },
  {
    id: 'corecraft-memory-engine',
    title: 'Lux',
    subtitle: 'Platform Observabilitas Kualitas Data',
    description:
      'Lux adalah platform observabilitas dan validasi kualitas data berbasis bukti (evidence-based) untuk analitika data dan insinyur perangkat lunak. Mengevaluasi dataset berdasarkan aturan kualitas deterministik, memetakan silsilah lineage DAG dari hulu ke hilir, dan mengoordinasikan investigasi insiden terstruktur dengan laporan audit yang dapat diverifikasi secara kriptografis.',
    category: 'Systems',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Flow', 'Python', 'FastAPI', 'SQLite WAL', 'SQLAlchemy', 'NetworkX', 'Alpine', 'Pytest', 'Vitest'],
    featured: false,
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    liveUrl: 'https://github.com/razeequtama',
    githubUrl: 'https://github.com/razeequtama/lux-data-observability',
    videoDemoUrl: '/video_demos/lux_video_demo.mp4',
    snapshotUrl: '/snapshots/lux_snapshot.avif',
    metrics: ['Bebas kebocoran memori', 'Operasi buffer sirkular O(1)', 'Peringatan compiler ketat'],
    architectureNotes: 'Mekanisme RAII untuk dealokasi memori deterministik dan kepemilikan eksplisit.',
  },
];

export const projectsData: ProjectItem[] = projectsDataEN;

export const experienceDataEN: ExperienceItem[] = [
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

export const experienceDataID: ExperienceItem[] = [
  {
    id: 'exp-lab-assistant-binus',
    role: 'Laboratory Assistant of Bina Nusantara University',
    location: 'Kota Bekasi, Indonesia',
    image: '/experience_pictures/lab_assistant.avif',
    period: 'Februari 2026 - Sekarang',
    achievements: [
      'Mendukung dan memfasilitasi 44 sesi praktikum laboratorium pada mata kuliah Full-Stack Development, Algoritma, dan Computational Physics, memberikan bimbingan teknis serta bantuan langsung kepada mahasiswa dalam menyelesaikan tugas praktikum, mengimplementasikan solusi pemrograman, dan menerapkan konsep keilmuan terkait.',
      'Membimbing mahasiswa melalui latihan pemrograman dan penugasan teknis dengan menguraikan konsep kompleks menjadi langkah implementasi yang jelas dan terstruktur, membantu mahasiswa memperkuat pemahaman mendasar tentang pemrograman, pola pikir algoritmik, serta metodologi komputasi.',
      'Mendiagnosis, menganalisis, dan membantu penyelesaian kesalahan kode (debugging), inkonsistensi logika, dan kendala implementasi, memperkuat teknik debugging, penalaran analitis, dan kemampuan pemecahan masalah mandiri mahasiswa.',
      'Memfasilitasi pengalaman belajar praktik langsung dengan menjembatani teori akademik dan penerapan teknis dunia nyata, mendorong mahasiswa menerjemahkan konsep abstrak ke dalam kode fungsional, solusi algoritma, dan implementasi komputasi.',
      'Membantu mahasiswa memahami alur kerja pengembangan perangkat lunak (software development workflows), prinsip perancangan algoritma, dan teknik pemecahan masalah komputasi secara sistematis untuk menghasilkan solusi yang andal.',
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
    period: 'September 2026 - Sekarang',
    achievements: [
      'Mengoordinasikan kegiatan klub dan inisiatif organisasi, mendukung eksekusi proyek dan keselarasan dengan tujuan strategis organisasi.',
      'Mengawasi produksi lebih dari 50 aset desain klub, menjaga konsistensi visual dan kepatuhan terhadap standar panduan desain organisasi.',
      'Bertindak sebagai Vice Project Manager untuk The Extraordinary Festival Seminar, Workshop, and Talkshow, mendukung koordinasi lintas divisi dan kelancaran pelaksanaan acara.',
      'Memimpin Divisi Desain untuk New Member Recruitment dan Welcoming Party, mengoordinasikan seluruh materi desain dan memastikan konsistensi visual di seluruh rangkaian acara organisasi.',
    ],
  },
];

export const experienceData: ExperienceItem[] = experienceDataEN;

export const skillCategoriesEN: SkillCategory[] = [
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

export const skillCategoriesID: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Bahasa Pemrograman',
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
    name: 'Pengembangan Frontend',
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
    name: 'Pengembangan Backend',
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
    name: 'Basis Data & Machine Learning',
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
    name: 'Peralatan, Pengujian & Deployment',
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

export const skillCategories: SkillCategory[] = skillCategoriesEN;

export const aboutDataEN: AboutContent = {
  bioParagraphs: [
    "I'm a Software Engineering student at BINUS University with a strong interest in building software that solves real-world problems. I enjoy working across the full stack, from designing intuitive user interfaces to engineering backend systems and data-driven solutions.",
    "Through projects like Mercury, Aegis, and Lux, I've developed a deeper appreciation for what makes software effective beyond simply working. Performance, reliability, accuracy, and maintainability are integral to the engineering process. I approach problems analytically and iteratively, breaking down complexity, investigating solutions, and continuously refining my work.",
    "Beyond engineering, I have a strong passion for design, particularly UI/UX, typography, and visual systems. I enjoy bringing technical functionality and visual clarity together to create software that is both well-engineered and intuitive to use.",
    "I'm currently seeking a software engineering internship where I can contribute to meaningful projects, learn from experienced engineers, and continue developing my ability to build effective, reliable, and scalable software.",
  ],
};

export const aboutDataID: AboutContent = {
  bioParagraphs: [
    'Saya seorang mahasiswa Rekayasa Perangkat Lunak (Software Engineering) di BINUS University dengan ketertarikan mendalam dalam membangun perangkat lunak yang memecahkan masalah di dunia nyata. Saya menikmati bekerja di seluruh spektrum full-stack, mulai dari merancang antarmuka pengguna yang intuitif hingga merekayasa sistem backend dan solusi berbasis data.',
    'Melalui proyek-proyek seperti Mercury, Aegis, dan Lux, saya semakin mengapresiasi faktor-faktor yang membuat perangkat lunak efektif lebih dari sekadar bisa berjalan. Performa, keandalan, akurasi, dan kemudahan pemeliharaan (maintainability) merupakan bagian integral dari proses rekayasa. Saya mendekati masalah secara analitis dan iteratif, mengurai kompleksitas, mengeksplorasi solusi, dan terus menyempurnakan hasil kerja saya.',
    'Di luar rekayasa perangkat lunak, saya memiliki minat besar pada desain, khususnya UI/UX, tipografi, dan sistem visual. Saya senang memadukan fungsionalitas teknis dengan kejelasan visual untuk menciptakan perangkat lunak yang tangguh sekaligus intuitif saat digunakan.',
    'Saat ini saya sedang aktif mencari kesempatan magang (internship) software engineering di mana saya dapat berkontribusi pada proyek bermakna, belajar dari para engineer berpengalaman, dan terus mengembangkan kemampuan saya dalam membangun perangkat lunak yang efektif, andal, dan terukur.',
  ],
};

export const aboutData: AboutContent = aboutDataEN;

export const contactDataEN: ContactContent = {
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

export const contactDataID: ContactContent = {
  email: 'rabbaniu74m4@gmail.com',
  location: 'Kota Bekasi, Jawa Barat, Indonesia',
  availability: 'Terbuka untuk Kesempatan Magang Software Engineering (Full-Time maupun Part-Time)',
  responseTime: 'Dalam waktu 1x24 jam kerja',
  resumeUrl: '/CV.pdf',
  socials: [
    {
      platform: 'GitHub',
      label: 'Repositori & Proyek Terbuka',
      url: 'https://github.com/razeequtama',
      handle: 'github.com/razeequtama',
    },
    {
      platform: 'LinkedIn',
      label: 'Profil Profesional',
      url: 'https://www.linkedin.com/in/raziqrabbaniutama/',
      handle: 'linkedin.com/in/raziqrabbaniutama',
    },
  ],
};

export const contactData: ContactContent = contactDataEN;

export const getDeveloperProfile = (lang: Language = 'en'): DeveloperProfile =>
  lang === 'id' ? developerProfileID : developerProfileEN;

export const getPortfolioSections = (lang: Language = 'en'): SectionMeta[] =>
  lang === 'id' ? portfolioSectionsID : portfolioSectionsEN;

export const getProjectsData = (lang: Language = 'en'): ProjectItem[] =>
  lang === 'id' ? projectsDataID : projectsDataEN;

export const getExperienceData = (lang: Language = 'en'): ExperienceItem[] =>
  lang === 'id' ? experienceDataID : experienceDataEN;

export const getSkillCategories = (lang: Language = 'en'): SkillCategory[] =>
  lang === 'id' ? skillCategoriesID : skillCategoriesEN;

export const getAboutData = (lang: Language = 'en'): AboutContent =>
  lang === 'id' ? aboutDataID : aboutDataEN;

export const getContactData = (lang: Language = 'en'): ContactContent =>
  lang === 'id' ? contactDataID : contactDataEN;
