const express = require("express");
const router = express.Router();
const validNewTask = require("../middleware/validNewTask");
const Zadatak = require("../models/Zadatak");

router.post("/add", validNewTask, async (req, res) => {
  const { opis, planDatPoc, planDatKraj, planBrSati, idProjekta} = req.body;

  try {
    let newZadatak = new Zadatak(opis, planDatPoc, planDatKraj, planBrSati, 1, 1, 1, idProjekta);
    let zadatak = await newZadatak.apply();

    res.status(200);
    return res.json({ zadatak });

  } catch (err) {
    console.error(err.message);
    console.log(planDatPoc + " " + planDatKraj)
    res.status(501).send("Server error");
  }
});

router.get("/allprojecttasks/:idProjekta", async (req, res) => {
 /* const { idVlasnika } = req.body;*/

  try {
    const { idProjekta } = req.params;
    const results = await Zadatak.getProjektiInfo(idProjekta);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;