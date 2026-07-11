// Agrega esto a tu server.js actual
// Nominatim es el estándar para buscar direcciones por nombre
app.get('/search', async (req, res) => {
    const query = req.query.q;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, { headers: { 'User-Agent': 'MiAppMapa' }});
    const data = await response.json();
    res.json(data); // Devuelve lat/lng del nombre buscado
});
