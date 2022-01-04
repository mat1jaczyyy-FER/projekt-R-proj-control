const express = require("express");
const router = express.Router();
const validNewTask = require("../middleware/validNewTask");
const Zadatak = require("../models/Zadatak");

router.post("/add", validNewTask, async (req, res) => {
  // todo ovdje se ne dobije id projekta?
  const { opisZadatka, planDatPoc, planDatKraj, planBrSati, idProjekta} = req.body;

  try {
    //testni hardcode
    const idVrste = 1;
    const idStatusa = 1;
    const idPrioriteta = 1;
    let newZadatak = new Zadatak(opisZadatka, planDatPoc, planDatKraj,  null, null, null, null, planBrSati, null, idVrste, idStatusa, idPrioriteta, null, idProjekta);
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
  try {
    const { idProjekta } = req.params;
    const results = await Zadatak.getZadatakInfo(idProjekta);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;