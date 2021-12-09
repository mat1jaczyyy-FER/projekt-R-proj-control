const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const Zaposlenik = require("../models/Zaposlenik");

router.post("/signup", validInfo, async (req, res) => {
  const { username, email, password, name, surname } = req.body;

  try {
    const user = await Zaposlenik.fetchByEmail(email);

    if (user.email !== undefined) {
      return res.status(401).json("Email already taken!");
    }

    const user2 = await Zaposlenik.fetchByUsername(username);

    if (user2.korisnickoIme !== undefined) {
      return res.status(401).json("Username already taken!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = new Zaposlenik(username, bcryptPassword, email, name, surname, 2);
    await newUser.apply();

    const jwtToken = jwtGenerator(newUser.username);
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

    if (user.email === undefined) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.lozinka
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.korisnickoIme);
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