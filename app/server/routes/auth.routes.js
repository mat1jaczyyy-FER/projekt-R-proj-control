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

    if (user !== null) {
      return res.status(401).json("Email already taken!");
    }

    const user2 = await Zaposlenik.fetchByUsername(username);

    if (user2 !== null) {
      return res.status(401).json("Username already taken!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = new Zaposlenik(username, bcryptPassword, email, name, surname, 2);
    let korisnik = await newUser.apply();

    const jwtToken = jwtGenerator(korisnik.rows[0].idzaposlenika);
    return res.json({ jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Zaposlenik.fetchByEmail(email);

    if (user === null) {
      return res.status(401).json("Invalid Credentials!");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.lozinka
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials!");
    }
    let results = null
    const sql = `SELECT * FROM Zaposlenik WHERE email = '${email}'`
    try {
        results = (await db.query(sql, [])).rows;

    } catch (err) {
        console.log(err);
        throw err;
    }

    const jwtToken = jwtGenerator(results.rows[0].idzaposlenika);
    return res.json({ jwtToken });

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