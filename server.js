const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

// File path to store gyroscopic data
const filePath = path.join(__dirname, "database.json");

// Endpoint to receive gyroscopic data
app.post("/gyro-data", (req, res) => {
    const gyroData = req.body;

    // Log gyroscopic data to confirm it's received
    console.log("Received Gyro Data:", gyroData);

    try {
        fs.writeFileSync(filePath, JSON.stringify(gyroData, null, 2)); // Save data to file
        res.status(200).send("Gyro data received and stored.");
    } catch (error) {
        console.error("Error saving gyro data:", error);
        res.status(500).send("Error saving gyro data.");
    }
});

// Endpoint to fetch the latest gyroscopic data
app.get("/gyro-data", (req, res) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath));
            res.json(data); // Send stored data
        } else {
            res.status(404).send("No gyroscopic data available.");
        }
    } catch (error) {
        console.error("Error reading gyro data:", error);
        res.status(500).send("Error reading gyro data.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});