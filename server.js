const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let users = {};
let reports = []; // {type: 'accidente', lat, lng, time}

app.post('/update', (req, res) => {
    const { id, lat, lng, report } = req.body;
    users[id] = { lat, lng, time: Date.now() };
    if (report) reports.push({ ...report, lat, lng, time: Date.now() });
    res.sendStatus(200);
});

app.get('/data', (req, res) => {
    const now = Date.now();
    reports = reports.filter(r => now - r.time < 3600000); // 1 hora de vigencia
    res.json({ users, reports });
});

app.listen(process.env.PORT || 3000);
