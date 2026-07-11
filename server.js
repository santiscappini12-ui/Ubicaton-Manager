const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let users = {};
let trafficEvents = []; // Almacena reportes (accidentes, obras)

// Endpoint para actualizar posición y estado
app.post('/update', (req, res) => {
    const { id, lat, lng, speed, report } = req.body;
    users[id] = { lat, lng, speed, timestamp: Date.now() };
    if (report) trafficEvents.push({ ...report, lat, lng, time: Date.now() });
    res.sendStatus(200);
});

// Endpoint para sincronización total
app.get('/sync', (req, res) => {
    // Filtrar eventos de más de 30 mins
    trafficEvents = trafficEvents.filter(e => Date.now() - e.time < 1800000);
    res.json({ users, trafficEvents });
});

app.listen(process.env.PORT || 3000);
