import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Read DATABASE_URL from .env, with a fallback to local PostgreSQL defaults
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/donnie_portfolio';

const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : (process.env.DATABASE_URL ? { rejectUnauthorized: false } : false)
});

// Logs connection status on boot
pool.on('connect', () => {
  console.log('PostgreSQL database pool connected.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
