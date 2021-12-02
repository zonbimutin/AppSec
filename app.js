const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// get config vars
dotenv.config()

const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog")


const app = express()
const port = 3000

app.use(cors())
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get config vars
dotenv.config()


app.use("/", mainRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})