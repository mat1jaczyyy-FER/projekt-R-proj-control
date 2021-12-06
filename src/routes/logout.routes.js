const express = require('express');
const router = express.Router();

//odjava korisnika
router.get('/', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;