const express = require('express')
const cors = require('cors')
const axios = require('axios')

const BASE_URL = "https://jobs.github.com/positions.json"
const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())

app.use('/', (req, res) => {
    axio
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})