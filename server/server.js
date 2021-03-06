const path = require('path');
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {generateMessage} = require('./utils/message')


const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
  console.log('New user connected')

  socket.emit('newMessage',generateMessage('Admin','Welcome Human'))

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'))

  socket.on('createMessage',(message)=>{
    io.emit('newMessage',generateMessage(message.from,message.text))
  })

  socket.on('disconnect',()=>{
    console.log('client disconnected')
  })
})


server.listen(port,()=>{
  console.log(`Server running on ${port}`)
})
