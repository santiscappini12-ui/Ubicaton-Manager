const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fetch = require('node-fetch');

app.use(express.static('public'));
app.use(express.json());

app.get('/search', async (req, res) => {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.query.q)}`;
        const response = await fetch(url, { headers: {'User-Agent': 'Ubicaton-Pro'} });
        const data = await response.json();
        res.json(data);
    } catch (e) { res.status(500).json([]); }
});

io.on('connection', (socket) => {
    socket.on('update-location', (data) => {
        socket.broadcast.emit('user-moved', { id: socket.id, ...data });
    });
});

http.listen(process.env.PORT || 3000, () => console.log('Servidor en puerto 3000'));
