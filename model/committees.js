const connection = require('../config/database')
const bcrypt = require('bcryptjs')

class committees {
    static async getAllCommittees() {
        try {
            const [rows] = await connection.query(`SELECT * FROM committees`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO committees SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE committees SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM committees WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM committees WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getCountCommittesProcess() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) as total_committees_process FROM committees WHERE status = 'Process'`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async getCountCommittesActive() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) as total_committees_active FROM committees WHERE status = 'Active'`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async getCommitees() {
        try {
            const [rows] = await connection.query(`SELECT id, name, email, status FROM committees`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async updateStatusCommittee(id, data) {
        try {
            const [result] = await connection.query(`UPDATE committees SET status = ? WHERE id = ?`, [data.status, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async updatePasswordAdmin(data, id) {
        try {
            const passwordHash = await bcrypt.hash(data.newPassword, 10)
            const passwordUpdate = { password: passwordHash }
            const [result] = await connection.query(`UPDATE committees SET ? WHERE id = ?`, [passwordUpdate, id])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = committees
