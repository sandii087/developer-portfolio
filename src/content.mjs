// Keep blank until a public address owned by Sandeep is selected.
export const defaultSiteUrl = '';

export const profile = {
  name: 'Sandeep Yadav',
  title: 'Software Developer',
  focus: 'Backend & full-stack development',
  email: 'keeponn87@gmail.com',
  phone: '+91 8004217248',
  telephone: 'tel:+918004217248',
  location: 'Varanasi, Uttar Pradesh',
  github: 'https://github.com/sandii087',
  linkedin: 'https://linkedin.com/in/sandeep-yadav-321414229',
  resume: './assets/Sandeep-Yadav-Resume.pdf'
};

export const skills = [
  { name: 'Languages', items: ['Java', 'Python', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  { name: 'Backend & databases', items: ['Spring Boot', 'FastAPI', 'PostgreSQL', 'MySQL'] },
  { name: 'Frontend', items: ['React', 'TypeScript', 'HTML', 'CSS'] },
  { name: 'Tools & deployment', items: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'Render', 'Neon'] },
  { name: 'Data & computer vision', items: ['Pandas', 'NumPy', 'OpenCV', 'PIL', 'scikit-learn', 'Matplotlib', 'Tableau', 'Excel'] },
  { name: 'Foundations', items: ['Object-oriented programming', 'Data structures & algorithms', 'SDLC'] }
];

export const projects = [
  {
    id: 'jobflow', number: '01', name: 'JobFlow', category: 'Backend',
    subtitle: 'Asynchronous job processing',
    description: 'A durable job-processing platform built around a PostgreSQL-backed queue. JWT-secured APIs accept work; concurrent workers claim, execute, retry, and recover jobs.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    repository: 'https://github.com/sandii087/Jobflow',
    problem: 'Coordinate background work while handling duplicate submissions, worker crashes, and failed attempts.',
    implementation: [
      'Built idempotent submission using a unique owner-and-key database constraint, so repeated requests resolve to the same stored job.',
      'Implemented atomic worker claims with row locks and SKIP LOCKED, time-limited leases, and recovery of expired work.',
      'Added exponential retry delays, attempt history, priority aging, and admin-only dead-letter replay.',
      'Included JWT authorization, database-backed rate limiting, Flyway migrations, OpenAPI documentation, and Actuator metrics.'
    ],
    tradeoff: 'PostgreSQL serves as both the durable store and queue, avoiding a separate broker. Execution is at least once: external side effects must be idempotent. Executors are demonstrations; lease renewal and high-throughput scaling remain future work.',
    evidence: 'The repository includes unit tests, PostgreSQL integration tests, Docker configuration, and a Render Blueprint. No live deployment or production-traffic claim is made.',
    source: 'https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/src/main/java/dev/jobflow/repo/JobRepository.java',
    sourceLabel: 'Inspect the queue implementation'
  },
  {
    id: 'devhub', number: '02', name: 'DevHub AI', category: 'Full-stack',
    subtitle: 'Developer collaboration workspace',
    description: 'A React and FastAPI workspace for organizations, private projects, tasks, and discussions, backed by PostgreSQL.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    repository: 'https://github.com/sandii087/devhub-ai',
    demo: 'https://devhub-ai-z6gw.onrender.com/',
    problem: 'Bring project coordination, access control, and developer collaboration into a single workspace.',
    implementation: [
      'Built organization roles, private project access, versioned tasks, discussions, and replies.',
      'Connected a responsive React/TypeScript interface to PostgreSQL-backed FastAPI endpoints.',
      'Implemented revocable cookie sessions with OIDC authentication and CSRF/origin checks.',
      'Added GitHub webhook and metadata-sync integration, opt-in AI drafting interfaces, and frontend/backend tests.'
    ],
    tradeoff: 'AI drafting and external integrations require provider configuration. Generated drafts do not automatically change tasks or repositories. The collaboration application lives in the repository’s devhub/ directory.',
    evidence: 'The resume supplies a Render application link and records deployment with Neon PostgreSQL. The repository also contains deployment configuration and documented launch gates.',
    source: 'https://github.com/sandii087/devhub-ai/tree/main/devhub',
    sourceLabel: 'Explore the application source'
  },
  {
    id: 'airline', number: '03', name: 'Airline Reservation System', category: 'Backend',
    subtitle: 'Transactional booking engine',
    description: 'A Java booking engine with a five-table MySQL schema, a separate service layer, and interchangeable in-memory and JDBC repositories.',
    technologies: ['Java', 'MySQL', 'JDBC', 'OOP'],
    repository: 'https://github.com/sandii087/airline-reservation-system',
    problem: 'Keep seat reservations consistent when multiple requests compete for the same flight and seat.',
    implementation: [
      'Separated Flight, Passenger, and Booking domain models from persistence through a BookingRepository interface.',
      'Implemented a JDBC booking path with SERIALIZABLE transactions, SELECT FOR UPDATE, and seat uniqueness constraints.',
      'Created a five-table schema covering flights, passengers, seats, bookings, and payments, with route indexing.',
      'Added in-memory concurrency tests for single-seat contention and flight capacity.'
    ],
    tradeoff: 'The repository’s concurrency demonstration uses the in-memory implementation. Live MySQL behavior and query latency require separate database testing; no database performance benchmark is claimed here.',
    evidence: 'The console demo and concurrency tests run without a database. The MySQL-backed path is available separately through the JDBC repository.',
    source: 'https://github.com/sandii087/airline-reservation-system/blob/main/src/main/java/com/sandeep/airline/dao/MySqlBookingRepository.java',
    sourceLabel: 'Inspect the transaction code'
  }
];

export const education = [
  { period: '2021 — 2025', name: 'B.Tech in Information Technology', school: 'Ajay Kumar Garg Engineering College, Ghaziabad', result: 'CGPA 7.17 / 10', label: 'View academic record', url: 'https://drive.google.com/file/d/1-SxQ2bxhfYb7R0y4YEaKJ5bTP-GJmnpJ/view?usp=sharing' },
  { period: '2020', name: 'Class XII · CBSE', school: 'Kashi Vipra National Public School, Varanasi', result: '87.6%', label: 'View marksheet', url: 'https://drive.google.com/file/d/18KQzDxCaI0XpXPq7UM7nZDJqDMc12_DC/view?usp=sharing' },
  { period: '2018', name: 'Class X · CBSE', school: 'Kashi Vipra National Public School, Varanasi', result: '82.2%', label: 'View marksheet', url: 'https://drive.google.com/file/d/1n7bjW7VR9binKSj0UevJOo1hYIFM2ZR0/view?usp=sharing' }
];

export const certifications = [
  { name: 'Databases and SQL for Data Science with Python', issuer: 'IBM / Coursera', date: 'March 2026', url: 'https://coursera.org/verify/9ZTP58S9O544' },
  { name: 'AI Fundamentals', issuer: 'AI & supervised learning', date: 'October 2024', description: 'Sales prediction project using supervised learning, feature engineering, and data handling.', url: 'https://www.guvi.in/certificate?id=w8yH31z67qx2ID7780' },
  { name: 'Problem Solving (Basic)', issuer: 'HackerRank', date: 'March 2024', url: 'https://www.hackerrank.com/certificates/eb001780293f' }
];
