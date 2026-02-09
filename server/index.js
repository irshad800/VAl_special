const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Visitor = require('./models/Visitor');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Sync Database
sequelize.sync().then(() => {
    console.log('Database synced');
});

// Track Visit Endpoint
app.post('/api/visit', async (req, res) => {
    try {
        const { userAgent } = req.body;
        // Get IP from request
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // If localhost, use a public IP for testing (e.g., Google DNS) or just '127.0.0.1'
        if (ip === '::1' || ip === '127.0.0.1') {
            try {
                const publicIpRes = await axios.get('https://api.ipify.org?format=json');
                ip = publicIpRes.data.ip;
            } catch (err) {
                // Fallback if IPify fails
                ip = '127.0.0.1';
            }
        }

        // Get Location Data
        let locationData = {};
        if (ip && ip !== '127.0.0.1') {
            try {
                const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
                locationData = geoRes.data;
            } catch (err) {
                console.error('GeoIP Error:', err.message);
            }
        }

        const visitor = await Visitor.create({
            ip,
            city: locationData.city || 'Unknown',
            region: locationData.regionName || 'Unknown',
            country: locationData.country || 'Unknown',
            location: locationData.lat && locationData.lon ? `${locationData.lat},${locationData.lon}` : 'Unknown',
            userAgent
        });

        res.json({ success: true, visit: visitor });
    } catch (error) {
        console.error('Tracking Error:', error);
        res.status(500).json({ error: 'Failed to track visit' });
    }
});

// Admin Stats Endpoint
app.get('/api/visits', async (req, res) => {
    try {
        const visits = await Visitor.findAll({
            order: [['visitTime', 'DESC']]
        });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
