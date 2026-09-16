import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const { Pool } = pg;


// Create a connection pool
const pool = new Pool({
    user: process.env.DB_USER,         // ← No quotes!
    password: process.env.DB_PASSWORD, // ← No quotes!
    host: process.env.DB_HOST,         // ← No quotes!
    port: process.env.DB_PORT,         // ← No quotes!
    database: process.env.DB_NAME      // ← No quotes!
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Connected to PostgreSQL database!');
    release(); // Release the client back to the pool
});

export default pool;

