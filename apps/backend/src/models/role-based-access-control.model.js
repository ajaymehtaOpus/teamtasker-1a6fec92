const { Pool } = require('pg');

// Database connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

class Role {
    constructor(name) {
        this.name = name;
    }

    static async createRole(name) {
        const query = 'INSERT INTO roles (name) VALUES ($1) RETURNING *';
        const values = [name];
        try {
            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (err) {
            throw new Error('Error creating role: ' + err.message);
        }
    }

    static async getAllRoles() {
        const query = 'SELECT * FROM roles';
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (err) {
            throw new Error('Error fetching roles: ' + err.message);
        }
    }
}

module.exports = Role;