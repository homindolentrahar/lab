const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const routers = require('./routes/transactions')
const connectDatabase = require('./config/database')

dotenv.config({
    path: './config/config.env'
})

connectDatabase()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/api/v1/transactions', routers)

if (process.env.ENV === 'development'){
    app.use(morgan('dev'))
}

app.listen(port, () => {
    console.log(`Listening to ${port}`.bold.yellow)
})