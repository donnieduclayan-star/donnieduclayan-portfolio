import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { query } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Auto-run schema and seeds on startup if database is empty
async function initDatabase() {
  try {
    // Check if the 'personal_info' table exists
    const res = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'personal_info'
      );
    `);

    const tableExists = res.rows[0].exists;
    if (!tableExists) {
      console.log('PostgreSQL tables not found. Initializing database schema...');

      const schemaPath = path.resolve('database/schema.sql');
      const seedPath = path.resolve('database/seed.sql');

      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await query(schemaSql);
        console.log('Database schema successfully migrated.');
      }

      if (fs.existsSync(seedPath)) {
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await query(seedSql);
        console.log('Database seeds successfully inserted.');
      }
    } else {
      console.log('PostgreSQL database is already initialized.');
    }
  } catch (err) {
    console.error('Database auto-initialization warning:', err.message);
    console.log('Make sure PostgreSQL is running and VITE_DATABASE_URL is set correctly.');
  }
}

// 1. GET: Fetch all Portfolio Resume Data dynamically
app.get('/api/portfolio-data', async (req, res) => {
  try {
    const profileRes = await query('SELECT * FROM personal_info LIMIT 1');
    const skillsRes = await query('SELECT * FROM skills');
    const expRes = await query('SELECT * FROM experiences ORDER BY display_order ASC');
    const projRes = await query('SELECT * FROM projects');
    const certsRes = await query('SELECT * FROM certifications');

    if (profileRes.rows.length === 0) {
      return res.status(404).json({ error: 'No profile data found.' });
    }

    const profile = profileRes.rows[0];

    // Format matches target data architecture
    res.json({
      personalInfo: {
        name: profile.name,
        title: profile.title,
        roles: [
          "IT Support Specialist",
          "System Administrator",
          "Project Manager",
          "System Developer",
          "Technical Support Engineer"
        ], // Stored as standard list
        bio: profile.bio,
        careerObjective: profile.career_objective,
        socials: {
          github: profile.github,
          linkedin: profile.linkedin,
          facebook: profile.facebook,
          email: `mailto:${profile.email_raw}`
        },
        emailRaw: profile.email_raw,
        phone: profile.phone,
        location: profile.location,
        resumeUrl: profile.resume_url
      },
      skills: skillsRes.rows,
      experiences: expRes.rows,
      projects: projRes.rows,
      certifications: certsRes.rows
    });
  } catch (err) {
    console.error('Error fetching data from database:', err.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 2. POST: Save recruiter message to Database
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await query(
      `INSERT INTO messages (name, email, subject, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, email, subject, message]
    );

    console.log(`New contact message logged from ${name}:`, result.rows[0]);
    res.status(201).json({
      success: true,
      message: 'Message saved directly to database.',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error writing message to database:', err.message);
    res.status(500).json({ error: 'Failed to write message to database.' });
  }
});

// Resume download endpoint
app.get('/api/resume', (req, res) => {
  const resumePath = path.resolve('public/resume.pdf');
  
  if (fs.existsSync(resumePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="DuclayanResumeFinal.pdf"');
    res.sendFile(resumePath, (err) => {
      if (err) {
        console.error('Error sending resume:', err);
        res.status(500).json({ error: 'Failed to download resume' });
      }
    });
  } else {
    res.status(404).json({ error: 'Resume file not found' });
  }
});

// Resume preview endpoint (HTML)
app.get('/api/resume/preview', (req, res) => {
  const resumeHtmlPath = path.resolve('public/resume.html');
  
  if (fs.existsSync(resumeHtmlPath)) {
    res.sendFile(resumeHtmlPath, (err) => {
      if (err) {
        console.error('Error sending resume preview:', err);
        res.status(500).json({ error: 'Failed to load resume preview' });
      }
    });
  } else {
    res.status(404).json({ error: 'Resume preview file not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Run database init and boot server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
  });
});
