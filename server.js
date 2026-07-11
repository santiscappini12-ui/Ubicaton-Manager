const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let users = {};

app.post('/update', (req, res) => {
    const { id, lat, lng, speed } = req.body;
    users[id] = { lat, lng, speed, time: Date.now() };
    res.sendStatus(200);
});

app.get('/all', (req, res) => {
    const now = Date.now();
    // Limpieza de inactivos
    for (let id in users) {
        if (now - users[id].time > 15000) delete users[id];
    }
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));
