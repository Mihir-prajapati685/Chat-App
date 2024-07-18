
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        
    }
});

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(express.static('frontened'));  // serve static files

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const users = {};


//io.on listening the connection and user ke je socket.on ma aave//
//socket.on mins je pan connection aave teni jode su thavu joiye e//
io.on('connection', socket => {
    socket.on('new-user-joined', username => {
        console.log('New user:', username);
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        const name = users[socket.id];
        if (name) {
            socket.broadcast.emit('left', { name });
            delete users[socket.id];
        }
    });
});
