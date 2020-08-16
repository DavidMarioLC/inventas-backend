const { Router } = require('express')
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller')
const route = Router()


route.post('/', createUser)

route.get('/', getUsers)

route.get('/:id', getUser)

route.put('/:id', updateUser)

route.delete('/:id', deleteUser)


module.exports = route