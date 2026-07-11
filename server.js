// 1. WebSocket para baja latencia (Socket.io)
const io = require('socket.io')(server);

// 2. Filtro de Kalman para suavizado
const KalmanFilter = require('kalmanjs');
const kf = new KalmanFilter();

io.on('connection', (socket) => {
    socket.on('update-pos', (data) => {
        // Aplicar filtro de Kalman
        const smoothLat = kf.filter(data.lat);
        const smoothLng = kf.filter(data.lng);
        
        // Broadcast a usuarios cercanos (usando un radio de 5km)
        socket.broadcast.emit('user-moved', {
            id: socket.id,
            lat: smoothLat,
            lng: smoothLng
        });
    });
});
