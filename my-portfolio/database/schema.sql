-- ====================================================================
-- Donnie R. Duclayan's Portfolio - PostgreSQL Database Schema
-- ====================================================================

-- 1. Contact Form Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Personal Profile Information
CREATE TABLE IF NOT EXISTS personal_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(150) NOT NULL,
    bio TEXT NOT NULL,
    career_objective TEXT NOT NULL,
    email_raw VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    location VARCHAR(200) NOT NULL,
    resume_url VARCHAR(255) NOT NULL,
    github VARCHAR(255),
    linkedin VARCHAR(255),
    facebook VARCHAR(255)
);

-- 3. Skill Categories and Skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- e.g. 'IT Support', 'Development'
    category_icon VARCHAR(50) NOT NULL, -- e.g. 'Monitor', 'Code'
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    tags TEXT[] -- Array of tags (e.g. ['OS Deployment', 'User Configs'])
);

-- 4. Professional Work Experience
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    period VARCHAR(50) NOT NULL,
    responsibilities TEXT[] NOT NULL,
    skills_used TEXT[] NOT NULL,
    display_order INT DEFAULT 0
);

-- 5. Software & Tech Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'yesdo-system'
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    role VARCHAR(100) NOT NULL,
    features TEXT[] NOT NULL,
    tech_stack TEXT[] NOT NULL,
    database_schema TEXT[],
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    mock_type VARCHAR(50) NOT NULL -- e.g. 'yesdo', 'plantrack'
);

-- 6. Professional Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    date_earned VARCHAR(50) NOT NULL,
    credential_id VARCHAR(100)
);
