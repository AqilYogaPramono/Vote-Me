const connection = require('../config/database')

class eventIndex {
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
            const [result] = await connection.query(`INSERT INTO event_index SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE event_index SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM event_index WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM event_index WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getStatus() {
        try {
            const [rows] = await connection.query(`SELECT status FROM event_index`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async getActiveEvents() {
        try {
            const [rows] = await connection.query(`SELECT voting_end_time FROM event_index`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = eventIndex
