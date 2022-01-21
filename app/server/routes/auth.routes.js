const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const Zaposlenik = require("../models/Zaposlenik");
const db = require('../database');
const aktivacijskiKodovi = require("../models/aktivacijskiKodovi");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport( {
  service: "hotmail",
  host: "smtp-mail.outlook.com",
  auth: {
    user: "proj-control@outlook.com",
    pass: "pr0j-c0ntr0l-2541245"
  },
  tls: {
    ciphers:'SSLv3'
    },
  port: 567,
  secureConnection: false,
  requireTLS: true
});

router.post("/signup", validInfo, async (req, res) => {
  const { username, email, password, name, surname } = req.body;

  try {
    const user = await Zaposlenik.fetchByEmail(email);
    console.log(user.email)
    

    if (!user) {
      return res.status(401).json("Email vec zauzet!");
    }

    const user2 = await Zaposlenik.fetchByUsername(username);

    if (!user2) {
      return res.status(401).json("Korisnicko ime vec zauzeto!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = new Zaposlenik(username, bcryptPassword, email, name, surname, 2);
    let korisnik = await newUser.apply();
    const data = {email: korisnik.rows[0].email, 
      iduloge: korisnik.rows[0].iduloge,
      idzaposlenika: korisnik.rows[0].idzaposlenika,
      imezaposlenika: korisnik.rows[0].imezaposlenika,
      korisnickoime: korisnik.rows[0].korisnickoime,
      prezimezaposlenika: korisnik.rows[0].prezimezaposlenika };

    let aktKod = crypto.randomBytes(25).toString('hex');
    let newKod = new aktivacijskiKodovi(korisnik.rows[0].idzaposlenika, aktKod);
    await newKod.apply();

    const confirmUrl = `http://localhost:5000/auth/emailConfirmation/${aktKod}`;

    transporter.sendMail({
      from: "proj-control@outlook.com",
      to: korisnik.rows[0].email,
      subject: "Potvrdite svoj email!",
      html: `Molimo pritisnite navedeni link kako biste potvrdili svoj email: <a href="${confirmUrl}">${confirmUrl}</a>`
    });

    const jwtToken = jwtGenerator(korisnik.rows[0].idzaposlenika);
    return res.json({ jwtToken, data });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Zaposlenik.fetchByEmail(email);
    console.log(user)

    if (user === null) {
      return res.status(401).json("Neispravan email ili lozinka!");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.lozinka
    );

    if (!validPassword) {
      return res.status(401).json("Neispravan email ili lozinka!");
    }
    let results = null
    const sql = `SELECT * FROM Zaposlenik WHERE email = '${email}'`
    try {
        results = (await db.query(sql, [])).rows;

    } catch (err) {
        console.log(err);
        throw err;
    }

    if (results[0].aktiviran == false) {
      return res.status(401).json("Email nije potvrđen!");
    }

    //const data = {results.email, results.iduloge, results.idzaposlenika, results.imezaposlenika, results.korisnickoime, results.prezimezaposlenika}
    const data = {email: results[0].email, 
      iduloge: results[0].iduloge,
      idzaposlenika: results[0].idzaposlenika,
      imezaposlenika: results[0].imezaposlenika,
      korisnickoime: results[0].korisnickoime,
      prezimezaposlenika: results[0].prezimezaposlenika };

    console.log(data)
    const jwtToken = jwtGenerator(results[0].idzaposlenika);
    return res.json({ jwtToken, data });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/emailConfirmation/:aktivacijskiKod", async (req, res) => {
  try {
    const { aktivacijskiKod } = req.params;
    const idKorisnika = await aktivacijskiKodovi.getKorisnikId(aktivacijskiKod);
    console.log(idKorisnika[0].idkorisnika);
    await Zaposlenik.activateKorisnik(idKorisnika[0].idkorisnika);
    await aktivacijskiKodovi.deleteAktivacijskiKod(idKorisnika[0].idkorisnika);

    res.status(400).send("Korisnik uspješno aktiviran!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Dogodila se greška kod aktivacije korisnika!");
  }
});

module.exports = router;
