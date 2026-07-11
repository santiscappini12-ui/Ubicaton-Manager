const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Usuario conectado: ' + socket.id);
    
    socket.on('update-location', (data) => {
        // En lugar de guardar, emitimos al toque a los demás
        socket.broadcast.emit('other-user', { 
            id: socket.id, 
            lat: data.lat, 
            lng: data.lng 
        });
    });
});

http.listen(process.env.PORT || 3000);
