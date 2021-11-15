const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const app = express()
const port = 3000

// get config vars
dotenv.config()
app.use(cors())
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})