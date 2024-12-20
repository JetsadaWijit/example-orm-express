const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('register', { message: '' });
});

router.post('/', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.render('register', { message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.render('register', { message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findUserByUsername(username);
        if (existingUser) {
            return res.render('register', { message: 'Username already taken' });
        }

        await User.createUser(username, password);
        req.session.username = username;
        res.redirect('/dashboard');
    } catch (error) {
        res.render('register', { message: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
