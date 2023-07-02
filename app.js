const express = require('express')
const socket  = require('socket.io')
const app = express()


const server = app.listen(8080, ()=>{
    console.log('Server Started on PORT 8080');
})

app.use(express.static('public'))

const io = socket(server)

io.on('connection', function (socket) {
    console.log('Socket connection Success')
    
    socket.on('chat', function(data){
        io.sockets.emit('chat',data)
    })
    socket.on('typing',function (user) {
        socket.broadcast.emit('typing',user)
    })
    io.emit('activeUsers', io.sockets.sockets.size);
    socket.on('disconnect', () => {
        // User disconnected
        console.log('User disconnected');
    
        // Emit the updated active number of users to all clients
        io.emit('activeUsers', io.sockets.sockets.size);
      });
})




// server()
