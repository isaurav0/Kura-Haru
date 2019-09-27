var express = require('express')
var socket = require('socket.io')

const app = express();

app.use(express.static('public'))

const server = app.listen(3000, ()=> console.log('server started on port 3000'));

//setup socket
const io = socket(server)

io.on('connection', (socket)=>{
    console.log("Socket connected. Socked id: ", socket.id);

    socket.on('chat', data=>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data=>{        
        io.sockets.emit('typing', data);
    });
});
