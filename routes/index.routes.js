const { Router } = require('express')
const authUser = require('../middlewares/authUser')
const validateUser = require('../middlewares/validateUser')
const route = Router()


route.post('/login', authUser)

route.get('/dashboard', validateUser)

module.exports = route