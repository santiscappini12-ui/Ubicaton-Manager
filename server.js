const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Gestión de usuarios con WebSockets
io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        // En lugar de guardar en un objeto simple, 
        // aquí es donde consultarías PostGIS para obtener solo los cercanos
        socket.broadcast.emit('user-update', { 
            id: socket.id, 
            lat: data.lat, 
            lng: data.lng,
            speed: data.speed 
        });
    });
});

http.listen(3000, () => console.log('Servidor de navegación profesional activo'));
