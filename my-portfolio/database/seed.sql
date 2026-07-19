-- ====================================================================
-- Donnie R. Duclayan's Portfolio - PostgreSQL Seed Data
-- ====================================================================

-- Clear existing data (optional / safe truncate for fresh seed)
TRUNCATE TABLE personal_info, skills, experiences, projects, certifications CASCADE;

-- 1. Insert Personal Profile Info
INSERT INTO personal_info (name, title, bio, career_objective, email_raw, phone, location, resume_url, github, linkedin, facebook)
VALUES (
    'Donnie R. Duclayan',
    'Information Technology Graduate',
    'Motivated and adaptable IT professional with experience in system administration, technical support, system development, and social media management. Skilled in troubleshooting hardware and software, experienced in managing projects, coordinating teams, and ensuring successful project execution. Demonstrated leadership as an SK Chairperson with experience in program planning, budget management, and community engagement.',
    'Seeking a challenging role in IT Support, System Administration, or Software Development where I can leverage my problem-solving abilities, technical expertise, and leadership skills to drive operational excellence and build impactful digital systems.',
    'donnieduclayan@gmail.com',
    '0952 458 6003',
    'Brgy. Cadaclan, San Fernando City, La Union',
    '/resume.pdf',
    'https://github.com/DonnieDuclayan',
    'https://www.linkedin.com/in/donnie-duclayan-a41816368',
    'https://facebook.com/donnie.duclayan'
);

-- 2. Insert Skills List
INSERT INTO skills (category, category_icon, name, description, icon_name, tags) VALUES
-- IT Support Category
('IT Support', 'Monitor', 'System Administration', 'Managing operational system health, user configurations, and technical workstation profiles.', 'ShieldAlert', ARRAY['OS Deployment', 'User Configs', 'System Health']),
('IT Support', 'Monitor', 'Hardware Diagnostics & PC Building', 'Assembling systems, identifying hardware issues, upgrading storage (SSD), and diagnosing RAM/CPU failures.', 'Cpu', ARRAY['PC Building', 'Upgrades', 'Diagnostics', 'RAM/SSD']),
('IT Support', 'Monitor', 'Software Installation & Maintenance', 'Deploying operating systems, software packages, driver configurations, and system patches.', 'FolderDown', ARRAY['OS Deploy', 'Drivers', 'Office Suite', 'Workstations']),
('IT Support', 'Monitor', 'Network & Printer Support', 'Configuring local office printers, handling driver setups, and solving connectivity blockages.', 'Printer', ARRAY['Network Printers', 'Troubleshooting', 'Driver Setup']),

-- Development Category
('Development', 'Code', 'React & Modern CSS', 'Building responsive, component-driven, type-safe web interfaces utilizing React and Tailwind CSS.', 'AppWindow', ARRAY['Hooks', 'Router', 'Framer Motion', 'Tailwind CSS']),
('Development', 'Code', 'Node.js & Express', 'Developing robust backends, API gateways, database connection architectures, and middlewares.', 'Server', ARRAY['RESTful APIs', 'JWT Auth', 'MVC Pattern', 'Middlewares']),
('Development', 'Code', 'PostgreSQL', 'Designing relational database schemas, handling transactions, optimizing indexes, and complex queries.', 'Database', ARRAY['SQL', 'Relational Schemas', 'Constraints', 'Pool Client']),
('Development', 'Code', 'Core Web Stack', 'Deep styling and layout structuring using modern HTML5, CSS3, and dynamic ES6+ JavaScript.', 'Layers', ARRAY['Semantic HTML', 'Flexbox/Grid', 'DOM Manipulation', 'ES6+']),

-- Tools & Design Category
('Tools & Design', 'Wrench', 'Design & Mockups', 'Creating wireframes, interactive user interface mockups, and assets with modern design utilities.', 'Layers', ARRAY['Figma', 'Canva', 'Wireframing']),
('Tools & Design', 'Wrench', 'Office Productivity', 'Authoring spreadsheets, documentation, reports, and managing team workspace files.', 'FileText', ARRAY['Microsoft Office', 'Excel', 'Documentation']),
('Tools & Design', 'Wrench', 'Git & Version Control', 'Managing codebase revisions, organizing feature branches, merging code, and tracking issues on GitHub.', 'GitBranch', ARRAY['Version Control', 'GitHub', 'PRs']),

-- Project Management & Leadership Category
('Project Management & Leadership', 'Users', 'Community Leadership', 'Serving as SK Chairperson, directing program setups, and coordinating community development.', 'Award', ARRAY['SK Chairperson', 'Team Building', 'Public Service']),
('Project Management & Leadership', 'Users', 'Budget Planning & Auditing', 'Directing public funding allocations in compliance with COA standard regulatory rules.', 'Calendar', ARRAY['Budgeting', 'COA Compliance', 'Financial Audits']),
('Project Management & Leadership', 'Users', 'Communication & Strategy', 'Articulating project goals, running assemblies, public speaking, and leading cross-functional teams.', 'FileText', ARRAY['Public Speaking', 'Planning', 'Collaboration']);

-- 3. Insert Experiences
INSERT INTO experiences (role, company, period, responsibilities, skills_used, display_order) VALUES
(
    'System Administrator',
    'BLAM SHJ Cockpit Arena',
    '2025 - Present',
    ARRAY[
        'Manage Windows computer networks, diagnosing system crashes and resolving hardware connectivity issues.',
        'Build custom PC workstations tailored to operational requirements and manage component installations.',
        'Conduct regular preventive maintenance schedules and monitor system health to guarantee minimal downtime.',
        'Provide technical troubleshooting and reliable workstation support, optimizing overall operational workflow efficiency.'
    ],
    ARRAY['System Administration', 'Hardware Diagnostics', 'PC Building', 'Workstation Support', 'System Monitoring'],
    0
),
(
    'Social Media Manager',
    'BLAM SHJ Cockpit Arena',
    '2025 - Present',
    ARRAY[
        'Create high-quality promotional graphic designs and video content to increase audience outreach.',
        'Launch and coordinate social media campaigns, tracking analytics data to optimize engagement metrics.',
        'Deliver live event stream updates, engaging with digital audiences and maintaining brand consistency.'
    ],
    ARRAY['Canva', 'Social Media Analytics', 'Content Creation', 'Graphic Design'],
    1
),
(
    'Technical Support Specialist',
    'Private Client',
    '2024 - 2025',
    ARRAY[
        'Diagnosed and resolved hardware issues, software conflicts, and local Wi-Fi connectivity problems.',
        'Provided personalized technical guidance, workstation setups, and digital tools onboarding.',
        'Maintained regular hardware upkeep, disk cleanups, and driver updates to keep client systems optimized.'
    ],
    ARRAY['Workstation Setup', 'Software Troubleshooting', 'Hardware Repair', 'Client Support'],
    2
),
(
    'SK Chairperson',
    'Barangay Cadaclan',
    '2018 - 2023',
    ARRAY[
        'Served as the executive head of the youth council, leading educational, sporting, and community development programs.',
        'Managed public budgets and youth funding allocations, ensuring strict compliance with COA standard guidelines.',
        'Presided over council assemblies, proposing resolutions, coordinating volunteer campaigns, and leading public speeches.'
    ],
    ARRAY['Community Leadership', 'Budget Management', 'COA Compliance', 'Public Speaking', 'Project Planning'],
    3
),
(
    'IT Intern',
    'Department of Trade and Industry (DTI) Region 1',
    '2023 - 2024',
    ARRAY[
        'Developed the DTI PlanTrack System, a planning, monitoring, tracking, and calendar management platform.',
        'Assisted in developing, managing, and monitoring DTI systems including the DTI:E-Records Management System and GenService System.',
        'Conducted QA testing, software troubleshooting, and technical support for DTI internal systems.',
        'Coordinated with regional and provincial offices to consolidate progress reports and build reporting features.',
        'Assisted in IT support tasks, desktop troubleshooting, network cable maintenance, and workstation configurations.'
    ],
    ARRAY['React', 'Express.js', 'PostgreSQL', 'QA Testing', 'Systems Development', 'IT Support', 'Technical Documentation'],
    4
),
(
    'Personal Aide',
    'Mr. Francisco "Kit" Ortega Jr.',
    '2022 - 2023',
    ARRAY[
        'Managed administrative schedules, official document cataloging, and day-to-day coordination tasks.',
        'Setup virtual meeting rooms, verified audio/video inputs, and resolved technology-related concerns during conferences.'
    ],
    ARRAY['Administrative Coordination', 'Technical Support', 'Meeting Setup', 'Document Management'],
    5
);

-- 4. Insert Projects
INSERT INTO projects (key_name, title, description, detailed_description, role, features, tech_stack, database_schema, github_url, live_url, mock_type)
VALUES (
    'yesdo-system',
    'YESDO Management System',
    'A secure, database-backed platform designed to catalog youth council records, register local projects, and track budget allocations.',
    'The Youth Empowerment & Sports Development Organization (YESDO) Management System is Donnie''s capstone project at Saint Louis College. It digits institutional workflows, allowing admins to register programs, track budgets, log volunteers, and verify compliance report outcomes.',
    'Lead Full-Stack Developer',
    ARRAY[
        'Role-Based Access Control (RBAC) with secure JWT encryption for Admin and Staff personnel.',
        'Live budgeting dashboard with dynamic data visualizations of allocations and remaining resources.',
        'Auto-generation of PDF-formatted compliance reports for auditing bodies.',
        'Volunteers directory tracking hours contributed and skills catalog.'
    ],
    ARRAY['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    ARRAY[
        'Users Table (id, email, password_hash, role, created_at)',
        'Projects Table (id, title, description, start_date, status, budget_id)',
        'Budgets Table (id, total_allocated, total_spent, fiscal_year)',
        'Volunteers Table (id, name, contact, hours_logged, project_id)'
    ],
    'https://github.com/DonnieDuclayan/yesdo-system',
    'https://yesdo-system.vercel.app',
    'yesdo'
),
(
    'dti-plantrack',
    'DTI PlanTrack System',
    'An internal workflow tracking platform engineered to schedule, audit, and monitor project milestones for DTI operations.',
    'Developed during the internship at the Department of Trade and Industry Region 1, PlanTrack is a custom tool built to solve progress reporting bottlenecks. It enables department heads to establish targets, assign personnel to tasks, and check real-time progress of ongoing program reviews via intuitive status indicators.',
    'Database & Backend Developer',
    ARRAY[
        'Dynamic timeline boards grouping milestones into ''Initiated'', ''Ongoing'', ''In Review'', and ''Accomplished''.',
        'Robust query optimization for PostgreSQL databases, reducing dashboard statistics load time.',
        'CSV export tool for immediate data compilation during weekly administrative meetings.',
        'Automated system alerts notifying users of approaching deadlines.'
    ],
    ARRAY['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Vite'],
    ARRAY[
        'Tasks Table (id, title, description, deadline, status, assignee_id)',
        'Departments Table (id, name, head_id)',
        'Milestones Table (id, task_id, progress_percentage, updated_by)'
    ],
    'https://github.com/DonnieDuclayan/dti-plantrack',
    'https://dti-plantrack.vercel.app',
    'plantrack'
),
(
    'dti-erecords',
    'DTI E-Records Management System',
    'A secure digital record indexing system designed to catalog and audit official documentation for DTI Region 1.',
    'Assisted in the system engineering and maintenance of DTI''s internal E-Records portal. It replaces manual file filing cabinets with database cataloging, introducing search indexes and record validation workflows.',
    'Assistant IT Support & Developer',
    ARRAY[
        'Employee directory and file metadata categorization.',
        'Advanced file search queries matching dates, departments, and keywords.',
        'Administrative system logs tracking record modifications.'
    ],
    ARRAY['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    ARRAY[
        'Records Table (id, file_name, file_path, category, upload_date, department_id)',
        'AuditLogs Table (id, user_id, action, timestamp, record_id)'
    ],
    'https://github.com/DonnieDuclayan/dti-erecords',
    'https://dti-erecords.vercel.app',
    'hris'
);

-- 5. Insert Certifications
INSERT INTO certifications (title, organization, date_earned, credential_id) VALUES
('Design Thinking Workshop', 'Makerspace Innovhub, Saint Louis College', '2025', 'SLC-DT-2025'),
('UP Digital Transformation', 'UP Diliman / Saint Louis College', '2025', 'UP-SLC-DX-2025');
