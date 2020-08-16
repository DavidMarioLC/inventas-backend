const User = require('../Models/User')
const passwordCompared = require('../libraries/PasswordCompared')
const { jwtUser } = require('../libraries/jwtUser')

const authUser = async (req, res) => {
    const { nameUser, passwordUser } = req.body

    const responseModel = await User.validateUser(nameUser)

    if (!responseModel) {
        res.status(403).json({ success: false, message: 'El usuario es incorrecto y no se encuentra registrado!' })

    } else {
        const authPassword = await passwordCompared(passwordUser, responseModel.passwordUser)

        if (!authPassword) {
            res.status(403).json({ success: false, message: 'la contraseña es incorrecta!' })
        } else {
            // jwt
            const token = await jwtUser(responseModel.idUser)
            res.status(200).json({ token: token, success: true, message: 'Bienvenido al sistema' })

        }



    }

}


module.exports = authUser