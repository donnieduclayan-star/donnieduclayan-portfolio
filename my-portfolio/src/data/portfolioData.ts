export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface Skill {
  name: string;
  description: string;
  iconName: string;
  tags: string[];
  logoId?: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  skillsUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  role: string;
  features: string[];
  techStack: string[];
  databaseSchema?: string[];
  githubUrl: string;
  liveUrl: string;
  mockType: "yesdo" | "plantrack" | "hris" | "portfolio";
}

export interface LeadershipActivity {
  role: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Certification {
  title: string;
  organization: string;
  date: string;
  credentialId?: string;
}

export const personalInfo = {
  name: "Donnie R. Duclayan",
  title: "Information Technology Graduate",
  roles: [
    "IT Support Specialist",
    "System Administrator",
    "Project Manager",
    "System Developer",
    "Technical Support Engineer"
  ],
  bio: "Motivated and adaptable IT professional with experience in system administration, technical support, system development, and social media management. Skilled in troubleshooting hardware and software, experienced in managing projects, coordinating teams, and ensuring successful project execution. Demonstrated leadership as an SK Chairperson with experience in program planning, budget management, and community engagement.",
  careerObjective: "Seeking a challenging role in IT Support, System Administration, or Software Development where I can leverage my problem-solving abilities, technical expertise, and leadership skills to drive operational excellence and build impactful digital systems.",
  socials: {
    github: "https://github.com/DonnieDuclayan",
    linkedin: "https://www.linkedin.com/in/donnie-duclayan-a41816368",
    facebook: "https://facebook.com/donnie.duclayan",
    email: "mailto:donnieduclayan@gmail.com"
  },
  emailRaw: "donnieduclayan@gmail.com",
  phone: "0952 458 6003",
  location: "Brgy. Cadaclan, San Fernando City, La Union",
  resumeUrl: "./resume.pdf"
};

export const stats: Stat[] = [
  {
    label: "Projects Completed",
    value: 6,
    suffix: "+",
    description: "Systems, web portals, and support projects built"
  },
  {
    label: "Systems Developed",
    value: 3,
    suffix: "",
    description: "Database-backed custom corporate systems"
  },
  {
    label: "Technical Skills",
    value: 15,
    suffix: "+",
    description: "IT support, networks, and software packages mastered"
  },
  {
    label: "Leadership Experience",
    value: 3,
    suffix: " Years",
    description: "Active community leadership as SK Chairperson"
  }
];

export const skills: Skill[] = [
  {
    name: "React & Vite (Frontend)",
    description: "Building responsive, modern Single Page Applications (SPAs) leveraging Vite for fast hot module replacement.",
    iconName: "AppWindow",
    tags: ["React", "Vite", "SPA", "HMR"],
    logoId: "react"
  },
  {
    name: "Node.js & Express (Backend)",
    description: "Architecturing fast web servers, backend application business logics, router gateways, and middleware pipelines.",
    iconName: "Server",
    tags: ["Node.js", "Express", "Backend", "API Design"],
    logoId: "node"
  },
  {
    name: "PostgreSQL (Database)",
    description: "Designing structured schema patterns, connection pooling setups, constraints configuration, and complex query optimizing.",
    iconName: "Database",
    tags: ["PostgreSQL", "SQL", "Pool", "Data Modeling"],
    logoId: "postgres"
  },
  {
    name: "JWT & bcrypt (Authentication)",
    description: "Implementing stateless secure authentication using JSON Web Tokens (JWT) and encryption salting using bcrypt.",
    iconName: "ShieldAlert",
    tags: ["JWT", "bcrypt", "Auth", "Security"],
    logoId: "jwt"
  },
  {
    name: "Helmet & Rate Limiting (Security)",
    description: "Securing APIs by configuring request-header filters via Helmet and preventing brute force requests using rate limits.",
    iconName: "Terminal",
    tags: ["Helmet", "Rate Limit", "CORS", "API Security"],
    logoId: "security"
  },
  {
    name: "Docker (Deployment)",
    description: "Containerizing services for isolated, reproducible server builds and cross-environment deployment parity.",
    iconName: "Boxes",
    tags: ["Docker", "Containers", "DevOps"],
    logoId: "docker"
  },
  {
    name: "REST API (API Style)",
    description: "Structuring standard HTTP requests and endpoints using resource-based structures and JSON formats.",
    iconName: "Network",
    tags: ["RESTful", "HTTP Verbs", "JSON APIs", "REST"],
    logoId: "api"
  },
  {
    name: "JavaScript (Language)",
    description: "Writing high-quality dynamic execution flows, backend services, and interactive client structures in modern ES6+ Javascript.",
    iconName: "Code",
    tags: ["JavaScript", "ES6+", "Promises", "Async/Await"],
    logoId: "js"
  }
];

export const experiences: Experience[] = [
  {
    role: "System Administrator",
    company: "BLAM SHJ Cockpit Arena",
    period: "2025 - Present",
    responsibilities: [
      "Manage Windows computer networks, diagnosing system crashes and resolving hardware connectivity issues.",
      "Build custom PC workstations tailored to operational requirements and manage component installations.",
      "Conduct regular preventive maintenance schedules and monitor system health to guarantee minimal downtime.",
      "Provide technical troubleshooting and reliable workstation support, optimizing overall operational workflow efficiency."
    ],
    skillsUsed: ["System Administration", "Hardware Diagnostics", "PC Building", "Workstation Support", "System Monitoring"]
  },
  {
    role: "Social Media Manager",
    company: "BLAM SHJ Cockpit Arena",
    period: "2025 - Present",
    responsibilities: [
      "Create high-quality promotional graphic designs and video content to increase audience outreach.",
      "Launch and coordinate social media campaigns, tracking analytics data to optimize engagement metrics.",
      "Deliver live event stream updates, engaging with digital audiences and maintaining brand consistency."
    ],
    skillsUsed: ["Canva", "Social Media Analytics", "Content Creation", "Graphic Design"]
  },
  {
    role: "Technical Support Specialist",
    company: "Private Client",
    period: "2024 - 2025",
    responsibilities: [
      "Diagnosed and resolved hardware issues, software conflicts, and local Wi-Fi connectivity problems.",
      "Provided personalized technical guidance, workstation setups, and digital tools onboarding.",
      "Maintained regular hardware upkeep, disk cleanups, and driver updates to keep client systems optimized."
    ],
    skillsUsed: ["Workstation Setup", "Software Troubleshooting", "Hardware Repair", "Client Support"]
  },
  {
    role: "SK Chairperson",
    company: "Barangay Cadaclan",
    period: "2023 - 2026",
    responsibilities: [
      "Served as the executive head of the youth council, leading educational, sporting, and community development programs.",
      "Managed public budgets and youth funding allocations, ensuring strict compliance with COA standard guidelines.",
      "Presided over council assemblies, proposing resolutions, coordinating volunteer campaigns, and leading public speeches."
    ],
    skillsUsed: ["Community Leadership", "Budget Management", "COA Compliance", "Public Speaking", "Project Planning"]
  },
  {
    role: "IT Intern",
    company: "Department of Trade and Industry (DTI) Region 1",
    period: "2023 - 2024",
    responsibilities: [
      "Developed the DTI PlanTrack System, a planning, monitoring, tracking, and calendar management platform.",
      "Assisted in developing, managing, and monitoring DTI systems including the DTI:E-Records Management System and GenService System.",
      "Conducted QA testing, software troubleshooting, and technical support for DTI internal systems.",
      "Coordinated with regional and provincial offices to consolidate progress reports and build reporting features.",
      "Assisted in IT support tasks, desktop troubleshooting, network cable maintenance, and workstation configurations."
    ],
    skillsUsed: ["React", "Express.js", "PostgreSQL", "QA Testing", "Systems Development", "IT Support", "Technical Documentation"]
  },
  {
    role: "Personal Aide",
    company: "Mr. Francisco \"Kit\" Ortega Jr.",
    period: "2022 - 2023",
    responsibilities: [
      "Managed administrative schedules, official document cataloging, and day-to-day coordination tasks.",
      "Setup virtual meeting rooms, verified audio/video inputs, and resolved technology-related concerns during conferences."
    ],
    skillsUsed: ["Administrative Coordination", "Technical Support", "Meeting Setup", "Document Management"]
  }
];

export const projects: Project[] = [
  {
    id: "yesdo-system",
    title: "YESDO Management System",
    description: "A secure, database-backed platform designed to catalog youth council records, register local projects, and track budget allocations.",
    detailedDescription: "The Youth Empowerment & Sports Development Organization (YESDO) Management System is Donnie's capstone project at Saint Louis College. It digits institutional workflows, allowing admins to register programs, track budgets, log volunteers, and verify compliance report outcomes.",
    role: "Lead Full-Stack Developer",
    features: [
      "Role-Based Access Control (RBAC) with secure JWT encryption for Admin and Staff personnel.",
      "Live budgeting dashboard with dynamic data visualizations of allocations and remaining resources.",
      "Auto-generation of PDF-formatted compliance reports for auditing bodies.",
      "Volunteers directory tracking hours contributed and skills catalog."
    ],
    techStack: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    databaseSchema: [
      "Users Table (id, email, password_hash, role, created_at)",
      "Projects Table (id, title, description, start_date, status, budget_id)",
      "Budgets Table (id, total_allocated, total_spent, fiscal_year)",
      "Volunteers Table (id, name, contact, hours_logged, project_id)"
    ],
    githubUrl: "https://github.com/DonnieDuclayan/yesdo-system",
    liveUrl: "https://yesdo-system.vercel.app",
    mockType: "yesdo"
  },
  {
    id: "dti-plantrack",
    title: "DTI PlanTrack System",
    description: "An internal workflow tracking platform engineered to schedule, audit, and monitor project milestones for DTI operations.",
    detailedDescription: "Developed during the internship at the Department of Trade and Industry Region 1, PlanTrack is a custom tool built to solve progress reporting bottlenecks. It enables department heads to establish targets, assign personnel to tasks, and check real-time progress of ongoing program reviews via intuitive status indicators.",
    role: "Database & Backend Developer",
    features: [
      "Dynamic timeline boards grouping milestones into 'Initiated', 'Ongoing', 'In Review', and 'Accomplished'.",
      "Robust query optimization for PostgreSQL databases, reducing dashboard statistics load time.",
      "CSV export tool for immediate data compilation during weekly administrative meetings.",
      "Automated system alerts notifying users of approaching deadlines."
    ],
    techStack: ["React", "Express.js", "PostgreSQL", "Tailwind CSS", "Vite"],
    databaseSchema: [
      "Tasks Table (id, title, description, deadline, status, assignee_id)",
      "Departments Table (id, name, head_id)",
      "Milestones Table (id, task_id, progress_percentage, updated_by)"
    ],
    githubUrl: "https://github.com/DonnieDuclayan/dti-plantrack",
    liveUrl: "https://dti-plantrack.vercel.app",
    mockType: "plantrack"
  },
  {
    id: "dti-erecords",
    title: "DTI E-Records Management System",
    description: "The pioneering Electronic Regulatory Compliance Reporting & Documentation System (E-ReCORDS) — the first of its kind in the Philippines, built for DTI Region 1.",
    detailedDescription: "The DTI E-ReCORDS (Electronic Regulatory Compliance Reporting & Documentation System) is a groundbreaking digital platform that Donnie helped engineer and maintain as an IT Intern at the Department of Trade and Industry Region 1. This system is a pioneer in the entire Philippines — it is the first fully digital regulatory compliance and documentation management system deployed across DTI regional offices nationwide. E-ReCORDS replaces traditional manual filing and paper-based compliance workflows with a comprehensive digital ecosystem featuring automated report generation, real-time monitoring logs, calendar-based activity scheduling, application management for regulatory violations, user role management, and full audit trail capabilities. The system handles Notice of Violations, Incident Reports, Preliminary Preventive Orders, and Certificates of Inspection — streamlining the entire consumer protection and business regulation workflow for DTI.",
    role: "Assistant IT Support & Developer",
    features: [
      "Super Admin Dashboard with calendar-based activity scheduling and real-time notification system.",
      "Application Management module handling Notice of Violations, Incident Reports, Preliminary Preventive Orders, and Certificates of Inspection.",
      "Automated Generation of Reports and Monitoring Logs for regulatory compliance tracking.",
      "User Profile Management with role-based access control (Super Admin, Admin, Staff).",
      "Product Standards / Vape Law monitoring and Business Name Law / Accreditation tracking.",
      "Full audit trail system logging every user action with timestamps for accountability."
    ],
    techStack: ["React", "Express.js", "PostgreSQL", "Tailwind CSS"],
    databaseSchema: [
      "Records Table (id, file_name, file_path, category, upload_date, department_id)",
      "AuditLogs Table (id, user_id, action, timestamp, record_id)"
    ],
    githubUrl: "https://github.com/DonnieDuclayan/dti-erecords",
    liveUrl: "https://dti-erecords.vercel.app",
    mockType: "hris"
  }
];

export const leadershipActivities: LeadershipActivity[] = [
  {
    role: "SK Chairperson",
    organization: "Barangay Cadaclan",
    period: "2018 - 2023",
    description: "Elected public official serving as the chairperson for the community youth council, managing local public resources and representing youth issues.",
    responsibilities: [
      "Oversee and budget public funds allocated for youth empowerment programs.",
      "Preside over monthly council assemblies, drafting resolutions and local ordinances.",
      "Coordinate sports activities, health seminars, and technology training projects."
    ],
    achievements: [
      "Successfully planned and executed a comprehensive sports development program, engaging 300+ local youth in active leagues.",
      "Drafted and secured approval for a community IT workshop, introducing basic programming concepts to high school students.",
      "Managed council budgets transparently, earning exemplary marks during standard government auditing reviews."
    ]
  }
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  institution: "Saint Louis College",
  period: "2022 - 2026",
  description: "Specialized in database systems administration, computer networking, systems analysis, and enterprise software engineering.",
  achievements: [
    "Capstone Project: Developed the YESDO Management System.",
    "Internship at Department of Trade and Industry (DTI) Region 1: Developed the DTI: PlanTrack Management System.",
    "Served as IT Project Manager for the development of DTI: e-Records and DTI: GenSys."
  ],
  coursework: [
    "Database Management Systems (PostgreSQL)",
    "Systems Analysis and Design",
    "Computer Networking & Diagnostics",
    "Information Security & System Administration",
    "Web Application Development",
    "Project Management Principles"
  ]
};

export const certifications: Certification[] = [
  {
    title: "Design Thinking Workshop",
    organization: "Makerspace Innovhub, Saint Louis College",
    date: "2025",
    credentialId: "SLC-DT-2025"
  },
  {
    title: "UP Digital Transformation",
    organization: "UP Diliman / Saint Louis College",
    date: "2025",
    credentialId: "UP-SLC-DX-2025"
  }
];
