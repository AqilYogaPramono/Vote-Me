const connection = require('../config/database')

class departements {
    static async getAllDepartments() {
        try {
            const [rows] = await connection.query(`SELECT * FROM departments`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO departments SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE departments SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM departments WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM departments WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getCountDepartments() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) AS count_department FROM departments`)
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = departements
