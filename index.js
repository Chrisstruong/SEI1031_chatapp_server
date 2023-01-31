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
// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:localhost3000',
//         method: ["GET", "POST"],
//     }
// })

// io.on("connection", (socket)=> {
//     console.log(`User connected: ${socket.id}`);
//     socket.on("join_room",(data)=>{
//         socket.join(data)
//         console.log(`user with ID: ${socket.id} joined room: ${data}`)
//     })
//     socket.on("disconnect",()=>{
//         console.log("User Disconnected", socket.id)
//     })
// })




// const authController = require('./controllers/auth-controller')
const memberController = require('./controllers/member-controller')
const conversationController = require('./controllers/conversation-controller')
const messageController = require('./controllers/messages-controller')



app.get('/', (req, res)=> {
    res.send("hello word")
})

// all request for endpoints that begin with '/user/'
app.use('/member', memberController)
// app.use('/auth', authController)
app.use('/conversations', conversationController)
app.use('/messages', messageController)


app.listen(PORT, ()=> {
    console.log(`listening on: ${PORT}`)
})