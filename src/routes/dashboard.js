const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    res.render('dashboard', { username: req.session.username });
});

module.exports = router;
