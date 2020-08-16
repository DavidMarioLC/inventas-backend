require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//db
require('./database/db')

//middleware´s
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
const user = require('./routes/users.routes')
app.use('/users', user)
const index = require('./routes/index.routes')
app.use('/', index)






// server init
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})

