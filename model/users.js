const connection = require('../config/database')

class users {
    static async getAllUsers() {
        try {
            const [rows] = await connection.query(`SELECT * FROM users`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO users SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE users SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM users WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM users WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getCountUsers() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) AS count_user FROM users`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = users
