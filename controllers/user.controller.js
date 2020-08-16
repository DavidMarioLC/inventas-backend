const ModelUser = require('../Models/User')
const passwordEncrypt = require('../libraries/PasswordHash')
const usersController = {
    getUsers: async function (req, res) {
        const users = await ModelUser.getUsers()
        res.status(200).json(users)
    },
    createUser: async function (req, res) {
        const { nameUser, passwordUser, fk_rol } = req.body;

        const passwordHash = await passwordEncrypt(passwordUser)

        const reqUser = {
            nameUser: nameUser,
            passwordUser: passwordHash,
            fk_rol: fk_rol
        }

        const user = new ModelUser(reqUser)
        const responseModel = await user.createUser()


        if (responseModel.affectedRows) {
            res.status(200).json({ success: true, message: 'Usuario registrado con exito!' })

        } else if (responseModel.sqlMessage) {
            res.status(403).json({ error: true, message: 'Error al registrar usuario!', sqlMessage: responseModel.sqlMessage })
        }


    },
    getUser: async function (req, res) {
        const { id } = req.params
        const user = await ModelUser.getUser(id)
        res.status(200).json(user)
    },
    updateUser: async function (req, res) {
        const { id } = req.params
        const { nameUser, passwordUser, fk_rol } = req.body;
        const passwordHash = await passwordEncrypt(passwordUser)

        const reqUser = {
            nameUser: nameUser,
            passwordUser: passwordHash,
            fk_rol: fk_rol
        }

        const user = new ModelUser(reqUser)
        const responseModel = await user.updateUser(id)


        if (responseModel.affectedRows) {
            res.status(200).json({ success: true, message: 'Usuario actualizado con exito!' })

        } else if (responseModel.sqlMessage) {
            res.status(403).json({ error: true, message: 'Error al actualizar usuario!', sqlMessage: responseModel.sqlMessage })
        }

    },
    deleteUser: async function (req, res) {
        const { id } = req.params
        const responseModel = await ModelUser.deleteUser(id)
        if (responseModel.affectedRows) {
            res.status(200).json({ success: true, message: 'Usuario eliminado con exito!' })

        }
    }
}

module.exports = usersController