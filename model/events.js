const connection = require('../config/database')

class events {
    static async getAllEvents() {
        try {
            const [rows] = await connection.query(`SELECT * FROM events`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO events SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE events SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM events WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM events WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getStatus() {
        try {
            const [rows] = await connection.query(`SELECT status FROM events`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async getActiveEvents() {
        try {
            const [rows] = await connection.query(`SELECT voting_end_time FROM events WHERE status = 'Active'`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = events
