const connection = require('../config/database')

class candidate {
    static async getAllCandidates() {
        try {
            const [rows] = await connection.query(`SELECT * FROM candidates`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getCandidates() {
        try {
            const [rows] = await connection.query(`SELECT id, candidate_number, candidate_photo, chair_candidate_name, vice_chair_candidate_name FROM candidates`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO candidates SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE candidates SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM candidates WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM candidates WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getCountCandidates() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) AS count_candidate FROM candidates`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = candidate
