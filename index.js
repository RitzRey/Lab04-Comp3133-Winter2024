const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const CONN_STRING = "mongodb+srv://reyritz2224:adminpass@cluster0.ehvajcf.mongodb.net/Users?retryWrites=true&w=majority"
mongoose.connect(CONN_STRING, { 
useNewUrlParser: true, 
useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'Something went wrong when trying to connect to MongoDB'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    city: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/,
    },
    website: {
        type: String,
        required: true,
        match: /^(http|https):\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}\/?$/,
    },
    zipCode: {
        type: String,
        required: true,
        match: /^\d{5}-\d{4}$/,
    },
    phone: {
        type: String,
        required: true,
        match: /^1-\d{3}-\d{3}-\d{4}$/,
    },
});

const User = mongoose.model('User', userSchema, 'Users');

app.use(bodyParser.json());

// http://localhost:3000/users 
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        req.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost port ${PORT}`)
});