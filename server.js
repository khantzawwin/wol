const express = require('express');
const bodyParser = require('body-parser');
const wol = require('wake-on-lan');

const app = express();
const port = 3000;

// Your PC's MAC address (replace with your own)
const macAddress = '00:1A:2B:3C:4D:5E';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint to handle WOL requests
app.post('/trigger', (req, res) => {
    console.log('Received a request to trigger WOL.');

    // Send WOL packet
    wol.wake(macAddress, (error) => {
        if (error) {
            console.error('Error waking the device:', error);
            res.status(500).send('Failed to wake device');
        } else {
            console.log('Device waking up...');
            res.status(200).send('WOL packet sent');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
