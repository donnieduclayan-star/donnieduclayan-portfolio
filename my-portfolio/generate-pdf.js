import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Create target directory if it doesn't exist
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(path.join(publicDir, 'resume.pdf'));
doc.pipe(writeStream);

// Helpers
const darkColor = '#111827';
const mutedColor = '#4B5563';

// Title Header
doc.fillColor(darkColor)
   .font('Helvetica-Bold')
   .fontSize(22)
   .text('DONNIE R. DUCLAYAN', { align: 'center' });

doc.fillColor(mutedColor)
   .font('Helvetica')
   .fontSize(9)
   .text('Brgy. Cadaclan, San Fernando City, La Union  |  0952 458 6003  |  donnieduclayan@gmail.com', { align: 'center' });

doc.moveDown(1.5);

function addSectionTitle(title) {
  doc.fillColor(darkColor)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text(title.toUpperCase());
  
  // Draw divider line
  const y = doc.y + 2;
  doc.moveTo(45, y)
     .lineTo(567, y)
     .strokeColor('#E5E7EB')
     .lineWidth(1)
     .stroke();
  
  doc.moveDown(0.8);
}

// 1. Summary
addSectionTitle('Professional Summary');
doc.fillColor(mutedColor)
   .font('Helvetica')
   .fontSize(9.5)
   .text(
     'Motivated and adaptable IT professional with experience in system administration, technical support, system development and social media management. Skilled in troubleshooting hardware, software, experienced in managing projects, coordinating teams, and ensuring successful project execution, and implementing efficient technical solutions. Demonstrated leadership as an SK Chairperson with experience in program planning, budget management, and community engagement.',
     { align: 'justify', lineGap: 2.5 }
   );
doc.moveDown(1.5);

// 2. Experience
addSectionTitle('Work Experience');

const experiences = [
  {
    role: 'System Administrator',
    company: 'BLAM SHJ Cockpit Arena',
    date: '2025 - Present',
    bullets: [
      'Managed Windows systems, troubleshooting and resolve hardware related issues, and PC Building.',
      'Performed preventive maintenance, and system monitoring.',
      'Improved operational efficiency through reliable technical support.'
    ]
  },
  {
    role: 'Social Media Manager',
    company: 'BLAM SHJ Cockpit Arena',
    date: '2025 - Present',
    bullets: [
      'Created promotional content and managed social media campaigns.',
      'Increased audience engagement through live updates and analytics.'
    ]
  },
  {
    role: 'Technical Support Specialist',
    company: 'Private Client',
    date: '2024 - 2025',
    bullets: [
      'Diagnosed and resolved hardware, software, and network issues.',
      'Provided technical assistance and user training.'
    ]
  },
  {
    role: 'SK Chairperson',
    company: 'Barangay Cadaclan',
    date: '2018 - 2023',
    bullets: [
      'Led youth programs focused on education, sports, and community development.',
      'Managed budgets and ensured compliance with COA guidelines.'
    ]
  },
  {
    role: 'IT Intern',
    company: 'Department of Trade and Industry (DTI) Region 1',
    date: '2023 - 2024',
    bullets: [
      'Developed the DTI PlanTrack System for planning, monitoring, tracking, and calendar management.',
      'Assisted in developing, managing and monitoring DTI systems including DTI:E-Records Management System and GenService System.',
      'Conducted QA testing, troubleshooting, and technical support for internal DTI systems.',
      'Coordinated with regional and provincial offices for system consolidation and reporting features.',
      'Assisted in project management, documentation, and user support activities.',
      'Performed hardware troubleshooting, computer maintenance, and network-related support.',
      'Diagnosed and resolved hardware, software, and connectivity issues.'
    ]
  },
  {
    role: 'Personal Aide',
    company: 'Mr. Francisco "Kit" Ortega Jr.',
    date: '2022 - 2023',
    bullets: [
      'Managed schedules, documents, and administrative tasks.',
      'Assisted with virtual meetings and technology-related concerns.'
    ]
  }
];

experiences.forEach((exp) => {
  // Save position to prevent page-break orphan headers
  if (doc.y > 680) {
    doc.addPage();
  }

  doc.fillColor(darkColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(`${exp.role} | ${exp.company}`, { continued: true })
     .fillColor(mutedColor)
     .font('Helvetica')
     .fontSize(9)
     .text(` (${exp.date})`, { align: 'right' });

  exp.bullets.forEach((bullet) => {
    doc.fillColor(mutedColor)
       .font('Helvetica')
       .fontSize(9)
       .text(`•  ${bullet}`, { indent: 12, lineGap: 1.5 });
  });
  doc.moveDown(0.8);
});

doc.moveDown(0.8);

// Projects Section
if (doc.y > 650) doc.addPage();
addSectionTitle('Projects');

const projectsList = [
  'YESDO: Youth, Education and Sports Development Management System for the City of San Fernando, La Union',
  'DTI: PlanTrack System: An Integrated Planning, Monitoring, Tracking and Calendar Management System for the Department of Trade and Industry Region 1',
  'DTI: E-Records: A secure digital record indexing system designed to catalog and audit official documentation for DTI Region 1.'
];

projectsList.forEach((proj) => {
  const parts = proj.split(': ');
  const title = parts[0] + ': ';
  const desc = parts.slice(1).join(': ');
  
  doc.fillColor(darkColor)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(title, { continued: true })
     .fillColor(mutedColor)
     .font('Helvetica')
     .text(desc, { lineGap: 2 });
  doc.moveDown(0.5);
});

doc.moveDown(0.8);

// 3. Education
if (doc.y > 680) doc.addPage();
addSectionTitle('Education');

doc.fillColor(darkColor)
   .font('Helvetica-Bold')
   .fontSize(9.5)
   .text('Saint Louis College - Bachelor of Science in Information Technology', { continued: true })
   .fillColor(mutedColor)
   .font('Helvetica')
   .fontSize(9)
   .text(' (2022 - 2026)', { align: 'right' });
doc.text('•  Capstone Project: YESDO - Youth, Education and Sports Development Management System', { indent: 12 });
doc.moveDown(0.5);

doc.fillColor(darkColor)
   .font('Helvetica-Bold')
   .fontSize(9.5)
   .text('La Union National High School - Senior & Junior High School', { continued: true })
   .fillColor(mutedColor)
   .font('Helvetica')
   .fontSize(9)
   .text(' (2019 - 2022)', { align: 'right' });
doc.moveDown(1.5);

// 4. Certifications
if (doc.y > 680) doc.addPage();
addSectionTitle('Certifications & Seminars');
doc.fillColor(mutedColor)
   .font('Helvetica')
   .fontSize(9)
   .text('•  Design Thinking Workshop - Makerspace Innovhub, Saint Louis College (2025)', { indent: 12, lineGap: 1.5 })
   .text('•  UP Digital Transformation - UP Diliman / Saint Louis College (2025)', { indent: 12, lineGap: 1.5 });
doc.moveDown(1.5);

// 5. Skills
if (doc.y > 680) doc.addPage();
addSectionTitle('Skills');
const skills = [
  'System Administration & Technical Troubleshooting: OS Deployment, Active Directory, Server Logs',
  'Hardware/Software Installation & Maintenance: PC Building, Upgrades, Driver setups, workstation repairs',
  'Tools & Design: Microsoft Office, Canva, Figma',
  'Core Competencies: Leadership, Communication, Problem-Solving',
  'Languages: English, Filipino, Iloko'
];
skills.forEach((skill) => {
  doc.fillColor(mutedColor)
     .font('Helvetica')
     .fontSize(9)
     .text(`•  ${skill}`, { indent: 12, lineGap: 1.5 });
});
doc.moveDown(1.5);

// 6. References
if (doc.y > 680) doc.addPage();
addSectionTitle('References');

const refs = [
  { name: 'Mark Vincent Garibay', role: 'BSIT major in Food Trades Technology', org: 'Don Mariano Marcos Memorial State University', phone: '0977 210 6582' },
  { name: 'Jolie Anne Gacayan', role: 'EXL Company', org: 'Nurse Associate', phone: '0956 3940 1524' },
  { name: 'Dianne R. Corpuz', role: 'SK Treasurer', org: 'Barangay Cadaclan', phone: '0954 972 6759' },
  { name: 'Francis Jucar', role: 'Cockpit Manager', org: 'BLAM SHJ COCKPIT ARENA', phone: '0961 853 4093' }
];

let startX = 45;
let startY = doc.y;
refs.forEach((ref, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = startX + col * 260;
  const y = startY + row * 50;
  
  doc.fillColor(darkColor)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(ref.name, x, y);
  doc.fillColor(mutedColor)
     .font('Helvetica')
     .fontSize(8.5)
     .text(ref.role, x, y + 11)
     .text(ref.org, x, y + 21)
     .text(ref.phone, x, y + 31);
});

doc.end();
console.log('PDF Resume compiled and saved to public/resume.pdf successfully.');
