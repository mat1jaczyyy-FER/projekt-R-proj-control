const express = require('express');
const router = express.Router();
const Zaposlenik = require('../models/Zaposlenik');

function renderLogin(req, res, err) {
    if (req.session.user) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        err: err
    })
}

router.get('/', function (req, res, next) {
    renderLogin(req, res, undefined);
});

//pokusaj prijave zaposlenika
router.post('/', async function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
        return;
    }

    let user = await Zaposlenik.getByKorisnickoIme(req.body.username);
    
    if (!user.checkCredentials(req.body.username, req.body.password)) {
        renderLogin(req, res, "Invalid credentials.");
        return;
    }

    //success
    req.session.user = user;
    res.redirect('/');
});

module.exports = router;