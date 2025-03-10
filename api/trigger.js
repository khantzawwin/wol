const express = require('express');
const bodyParser = require('body-parser');
const wol = require('wake-on-lan');

const app = express();

const macAddress = '00:1A:2B:3C:4D:5E'; // Replace with your device's MAC address

app.use(bodyParser.json());

// Endpoint to trigger WOL
app.post('/', (req, res) => {
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

// Export the app for Vercel
module.exports = app;
