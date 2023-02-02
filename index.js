require("dotenv").config()
const {PORT, MONGODB_URI} = process.env

const express = require("express")

const app = express()
// const http = require('http')
const cors = require('cors')
const morgan = require("morgan")
// const {Server} = require("socket.io")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))




const memberController = require('./controllers/member-controller')
const conversationController = require('./controllers/conversation-controller')
const messageController = require('./controllers/messages-controller')
const authController = require('./controllers/auth-controller')



app.get('/', (req, res)=> {
    res.send("hello word")
})

// all request for endpoints that begin with '/user/'
app.use('/member', memberController)
// app.use('/auth', authController)
app.use('/conversations', conversationController)
app.use('/messages', messageController)
app.use('/auth', authController)


app.listen(PORT, ()=> {
    console.log(`listening on: ${PORT}`)
})