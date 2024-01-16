// Import Express Module for 
const express = require('express');

// Import path module for file paths
const path = require('path');

const socketIo = require('socket.io');

const http = require('http');

// Create express app and set port
const app = express();
const server = http.createServer(app);
const port = 3000;

const io = socketIo(server);

//Serve stativ files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests to the root URL via index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/jeopardy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/games/Game2', 'jeopardy.html'));
});

const rooms = new Map();

io.on('connection', (socket) => {
    // Handle room creation
    socket.on('createRoom', (roomCode) => {
        if (!rooms.has(roomCode)) {
            rooms.set(roomCode, new Set([socket.id]));
            socket.join(roomCode);
            io.to(socket.id).emit('roomCreated', roomCode);
        } else {
            io.to(socket.id).emit('roomExists', roomCode);
        }
    });

    // Handle joining a room
    socket.on('joinRoom', (roomCode) => {
        if (rooms.has(roomCode)) {
            rooms.get(roomCode).add(socket.id);
            socket.join(roomCode);
            io.to(socket.id).emit('roomJoined', roomCode);
        } else {
            io.to(socket.id).emit('roomNotFound', roomCode);
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});