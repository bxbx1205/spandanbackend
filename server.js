const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body

// Variable to store gyroscopic data
let gyroData = { alpha: 0, beta: 0, gamma: 0 };

// Endpoint to update gyroscopic data
app.post("/gyro-data", (req, res) => {
    try {
        gyroData = req.body; // Store gyroscopic data
        console.log("Received Gyro Data:", gyroData); // Log data for debugging
        res.status(200).send("Gyro data received.");
    } catch (error) {
        console.error("Error receiving gyro data:", error);
        res.status(500).send("Error receiving gyro data.");
    }
});

// Endpoint to fetch the latest gyroscopic data
app.get("/gyro-data", (req, res) => {
    res.json(gyroData); // Send the stored gyroscopic data
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});