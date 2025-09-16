const connection = require('../config/database')

class faculties {
    static async getAllFaculties() {
        try {
            const [rows] = await connection.query(`SELECT * FROM faculties`)
            return rows
        } catch (err) {
            throw err
        }
    }

        static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO faculties SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE faculties SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM faculties WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM faculties WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = faculties
