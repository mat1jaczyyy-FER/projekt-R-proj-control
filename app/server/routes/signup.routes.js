const express = require('express');
const router = express.Router();
const Zaposlenik = require('../models/Zaposlenik')

function renderSignup(req, res, err) {
    if (req.session.user) {
        res.redirect('/');
        return;
    }

    res.render('signup', {
        err: err
    })
}

router.get('/', function (req, res, next) {
    renderSignup(req, res, undefined);
});

// pokusaj registracije zaposlenika
router.post('/', async function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
        return;
    }
    
    if (req.body.password !== req.body.password2) {
        renderSignup(req, res, "Password entries do not match.");
        return;
    }

    let user = await Zaposlenik.fetchByKorisnickoIme(req.body.username);

    if (user.getKorisnickoIme() === req.body.username) {
        renderSignup(req, res, "User already exists.");
        return;
    }

    //registriraj novog korisnika
    user = new Zaposlenik(req.body.username, req.body.password, req.body.email, req.body.name, req.body.surname, null);
    await user.apply();

    //store u session i redirect
    req.session.user = user;
    res.redirect('/');
});

module.exports = router;