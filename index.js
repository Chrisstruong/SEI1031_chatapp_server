require("dotenv").config()
const {PORT, MONGODB_URI} = process.env

const express = require("express")

const app = express()
const cors = require('cors')
const morgan = require("morgan")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
const memberController = require('./controllers/member-controller')



app.get('/', (req, res)=> {
    res.send("hello word")
})

// all request for endpoints that begin with '/user/'
app.use('/member', memberController)


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
