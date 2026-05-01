const { Pool } = require('pg');
const pool = new Pool();

// Admin User Management Model
class AdminUserManagement {
    static async getAllUsers() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (error) {
            throw new Error('Error retrieving users: ' + error.message);
        }
    }

    static async createUser(email, password, role) {
        try {
            const result = await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *', [email, password, role]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async updateUser(id, email, password, role) {
        try {
            const result = await pool.query('UPDATE users SET email = $1, password = $2, role = $3 WHERE id = $4 RETURNING *', [email, password, role, id]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    static async deleteUser(id) {
        try {
            await pool.query('DELETE FROM users WHERE id = $1', [id]);
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = AdminUserManagement;