const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const Zaposlenik = require("../models/Zaposlenik");

router.post("/signup", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await Zaposlenik.fetchByEmail(email);

    if (user) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = new Zaposlenik(name, bcryptPassword, email, "", "");
    await newUser.apply();

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
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

    if (!user) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.lozinka
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
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