// Import Express Module for 
const express = require('express');

// Import path module for file paths
const path = require('path');

// Create express app and set port
const app = express();
const port = 3000;

//Serve stativ files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests to the root URL via index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server on given port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
