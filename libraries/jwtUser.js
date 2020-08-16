const jwt = require('jsonwebtoken')


const jwtUser = async (idUser) => {
    const token = await jwt.sign({ id: idUser }, process.env.SECRET, { expiresIn: '1h' })
    return token
}

const jwtVerify = async (tokenClient) => {
    try {
        const decode = await jwt.verify(tokenClient, process.env.SECRET)
        return decode

    } catch (error) {
        return error
    }
}
module.exports = {
    jwtUser,
    jwtVerify
}