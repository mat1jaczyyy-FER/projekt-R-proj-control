const express = require("express");
const router = express.Router();
const Zaposlenik = require("../models/Zaposlenik");

router.get("/allusers", async (req, res) => {
    try {
        let results = await Zaposlenik.getAll();
        return res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;