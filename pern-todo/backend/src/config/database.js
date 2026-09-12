import pg from 'pg';
const { Pool } = pg;

// Create a connection pool
const pool = new Pool({
    user: 'postgres',         
    password: 'postgres', 
    host: 'localhost',        
    port: 5432,               
    database: 'Task'           
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