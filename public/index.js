var socket = io();
socket.on('connect',function(){
    console.log('Connected to server')
})

socket.on('disconnect',function(){
    console.log('Disconnected from server')
})

socket.on('newMessage',function(data){
    console.log('New message',data)
})