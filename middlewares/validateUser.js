const { jwtVerify } = require('../libraries/jwtUser')
const User = require('../Models/User')

const validateUser = async (req, res, next) => {
    const tokenClient = req.headers.token

    if (tokenClient) {
        const tokenDecode = await jwtVerify(tokenClient)
        const user = await User.getUser(tokenDecode.id)
        res.status(200).json({ auth: true, message: 'Token validado y acceso al dashboard permitido', user: user })

    } else {
        res.status(403).json({ auth: false, message: 'Token invalido y acceso al dashboard negado' })

    }

}

module.exports = validateUser
