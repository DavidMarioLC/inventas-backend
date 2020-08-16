const db = require('../database/db')

class User {
    constructor({ nameUser, passwordUser, fk_rol }) {
        this.nameUser = nameUser
        this.passwordUser = passwordUser
        this.fk_rol = fk_rol
    }

    async createUser() {


        try {
            const sqlSentence = "INSERT INTO ?? SET ?"
            const sqlPreparing = ['users', {
                nameUser: this.nameUser,
                passwordUser: this.passwordUser,
                fk_rol: this.fk_rol
            }]
            const sql = await db.format(sqlSentence, sqlPreparing)
            const response = await db.query(sql)

            return response

        } catch (error) {
            return error
        }

    }
    static async getUsers() {
        try {
            const sqlSentence = "SELECT users.idUser,users.nameUser, users.passwordUser, rols.nameRol FROM ?? INNER JOIN rols ON users.fk_rol=rols.idRol "
            const sqlPreparing = ['users']
            const sql = await db.format(sqlSentence, sqlPreparing)
            const response = await db.query(sql)

            return response

        } catch (error) {
            return error
        }
    }
    static async getUser(id) {
        try {
            const sqlSentence = "SELECT users.idUser,users.nameUser, rols.nameRol FROM ?? INNER JOIN rols ON users.fk_rol=rols.idRol  WHERE ?? = ?"
            const sqlPreparing = ['users', 'idUser', id]
            const sql = await db.format(sqlSentence, sqlPreparing)
            const responseDb = await db.query(sql)
            const response = responseDb[0]

            return response

        } catch (error) {
            return error
        }
    }
    async updateUser(id) {
        try {
            const sqlSentence = "UPDATE users SET nameUser = ?, passwordUser = ?, fk_rol = ? WHERE idUser = ?"
            const sql = await db.format(sqlSentence, [this.nameUser, this.passwordUser, this.fk_rol, id])
            const response = await db.query(sql)

            return response

        } catch (error) {
            return error
        }
    }
    static async deleteUser(id) {
        try {
            const sqlSentence = "DELETE FROM ?? WHERE ?? = ?"
            const sqlPreparing = ['users', 'idUser', id]
            const sql = await db.format(sqlSentence, sqlPreparing)
            const response = await db.query(sql)
            return response

        } catch (error) {
            return error
        }
    }
    static async validateUser(nameUser) {
        try {
            const sqlSentence = "SELECT users.idUser,users.nameUser, users.passwordUser, rols.nameRol FROM ?? INNER JOIN rols ON users.fk_rol=rols.idRol  WHERE ?? = ?"
            const sqlPreparing = ['users', 'nameUser', nameUser]
            const sql = await db.format(sqlSentence, sqlPreparing)
            const responseDb = await db.query(sql)
            const response = responseDb[0]

            return response

        } catch (error) {
            return error
        }
    }
}

module.exports = User