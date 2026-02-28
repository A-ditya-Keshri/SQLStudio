import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

/**
 * Validates and executes a SQL query against the sandbox.
 * @param {string} sql 
 * @returns {Promise<{rows: any[], fields: any[]}>}
 */
async function executeQuery(sql) {
    // Basic sanitization: Only allow SELECT queries (since it's a learning platform)
    const trimmed = sql.trim().toUpperCase();
    if (!trimmed.startsWith('SELECT')) {
        throw new Error('Only SELECT queries are allowed in this sandbox.');
    }

    // Prevent common destructive keywords even if in strings (naive check)
    const destructive = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'GRANT', 'REVOKE'];
    for (const keyword of destructive) {
        if (trimmed.includes(keyword)) {
            // Check if it's a standalone word
            const regex = new RegExp(`\\b${keyword}\\b`);
            if (regex.test(trimmed)) {
                throw new Error(`Security violation: ${keyword} is not permitted.`);
            }
        }
    }

    const client = await pool.connect();
    try {
        const res = await client.query(sql);
        return {
            rows: res.rows,
            fields: res.fields.map(f => f.name)
        };
    } finally {
        client.release();
    }
}

export { executeQuery };
