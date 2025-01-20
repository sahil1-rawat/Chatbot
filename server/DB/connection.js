import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

export const db = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect((err, client) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('Connected to PostgreSQL!');
    client.release();
  }
});
