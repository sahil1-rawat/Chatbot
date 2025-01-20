import dotenv from 'dotenv';
import { createConnection } from 'mysql2';

dotenv.config();

export const db = createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL!');
  }
});
