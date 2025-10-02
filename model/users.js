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

    static async getparticipants() {
        try {
            const [rows] = await connection.query(`SELECT u.id, u.name, u.gender, u.student_id, ey.year, m.major_name, d.department_name, f.faculty_name, u.status AS user_status FROM users u LEFT JOIN enrollment_years ey ON u.enrollment_year_id = ey.id LEFT JOIN majors m ON u.major_id = m.id LEFT JOIN departments d ON m.department_id = d.id LEFT JOIN faculties f ON d.faculty_id = f.id`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async updateStatus(id, status) {
        try {
            const [result] = await connection.query(`UPDATE users SET status = ? WHERE id = ?`, [status, id])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = users
