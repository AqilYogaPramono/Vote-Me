const connection = require('../config/database')

class majors {
    static async getAllMajors() {
        try {
            const [rows] = await connection.query(`SELECT * FROM majors`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO majors SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE majors SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM majors WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM majors WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getCountMajors() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) AS count_major FROM majors`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = majors
