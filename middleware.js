const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware to check for NDA agreement
const checkNdaAgreement = (req, res, next) => {
    // Check if the user has agreed to the NDA (e.g., using a cookie or session)
    if (req.cookies && req.cookies.nda_agreement === 'true') {
        // User has agreed, proceed to the next middleware/route handler
        next();
    } else {
        // User has not agreed, redirect to the NDA agreement page
        res.redirect('/nda-agreement');
    }
};

// Route to serve the NDA agreement page
app.get('/nda-agreement', (req, res) => {
    // Serve the NDA agreement HTML page
    res.sendFile(path.join(__dirname, 'public', 'nda.html')); // Ensure nda.html is in your public directory
});

module.exports = { checkNdaAgreement };