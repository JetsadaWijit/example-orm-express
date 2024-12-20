const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login', { message: '' });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findUser(username, password);
        if (user) {
            req.session.username = user.username;
            res.redirect('/dashboard');
        } else {
            res.render('login', { message: 'Invalid username or password' });
        }
    } catch (error) {
        res.render('login', { message: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
