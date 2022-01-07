const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const Zaposlenik = require("../models/Zaposlenik");
const db = require('../database');

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

module.exports = router;