const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000; // Or any port you prefer
const cors = require('cors'); // Add this line
const cookieParser = require('cookie-parser'); // Add this line
const { checkNdaAgreement } = require('./middleware'); // Import the middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie parser middleware

// Serve static files (your HTML, CSS, JS)
app.use(express.static('public'));

// Add this route handler
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Apply the NDA check to all routes *except* /nda-agreement
app.use((req, res, next) => {
    if (req.path === '/nda-agreement') {
        next(); // Skip NDA check for the agreement page itself
    } else {
        checkNdaAgreement(req, res, next);
    }
});

// POST endpoint for NDA agreement submission
app.post('/nda-agreement', (req, res) => {
    if (req.body.nda_agree === 'true') {
        // Set a cookie to indicate agreement
        res.cookie('nda_agreement', 'true', { maxAge: 900000, httpOnly: true }); // Expires in 15 minutes
        res.redirect('/'); // Redirect to the home page or wherever you want
    } else {
        // Handle disagreement (e.g., show an error message)
        res.send('You must agree to the NDA to proceed.');
    }
});

// POST endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your email service
        auth: {
            user: 'mjmcorppro@gmail.com', // Your Gmail address
            pass: 'your-gmail-app-password'  // Your Gmail password or App Password
        }
    });

    // Email message options
    const mailOptions = {
        from: 'mjmcorppro@gmail.com', // Who is sending the email (can be your address)
        to: 'mjmcorppro@gmail.com',         // Your work email
        subject: 'Support Form Submission from Streamer\'s Delight',
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ success: false, message: 'Sorry, there was an error submitting your message. Please try again later.' });
        } else {
            console.log('Email sent:', info.response);
            res.send({ success: true, message: 'Thank you! We will be in touch soon.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Server listening on port ${port}`);
});