const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Gyro Backend Server! Use /gyro-data to interact with the gyroscopic data.");
});

// Endpoint to receive gyroscopic data
app.post("/gyro-data", (req, res) => {
    const gyroData = req.body;
    fs.writeFileSync("database.json", JSON.stringify(gyroData));
    res.status(200).send("Gyro data received and stored.");
});

// Endpoint for ESP32 to fetch the latest gyroscopic data
app.get("/gyro-data", (req, res) => {
    if (fs.existsSync("database.json")) {
        const data = JSON.parse(fs.readFileSync("database.json"));
        res.json(data);
    } else {
        res.status(404).send("No gyroscopic data available.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});