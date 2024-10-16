const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('public'));

const userFile = 'users.json';
const restaurantFile = 'restaurants.json';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service (change if needed)
    auth: {
        user: 'bitebuzzsofficial@gmail.com', // Replace with your email
        pass: 'tdnn fvpx gwom ndlj'   // Replace with your email password or app-specific password
    }
});

app.get('/restaurants', (req, res) => {
    fs.readFile(restaurantFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/register', (req, res) => {
    const newUser = req.body;

    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user file');
        }

        let users = data ? JSON.parse(data) : [];

        if (users.some(user => user.email === newUser.email)) {
            return res.status(400).send('Email already exists');
        }

        users.push(newUser);

        fs.writeFile(userFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to user file');
            }
            res.send('User registered successfully');
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user file');
        }

        const users = data ? JSON.parse(data) : [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.json({ name: user.name, email: user.email });
        } else {
            res.status(400).send('Invalid email or password');
        }
    });
});

app.post('/send-bill', (req, res) => {
    const { email, billContent } = req.body;

    const mailOptions = {
        from: 'bitebuzzsofficial@gmail.com', // Sender email
        to: email,                    // Recipient email
        subject: 'Your Order Bill',    // Subject line
        text: billContent              // Email content (the bill)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
