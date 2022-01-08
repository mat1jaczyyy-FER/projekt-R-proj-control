const express = require("express");
const router = express.Router();
const validNewTask = require("../middleware/validNewTask");
const Zadatak = require("../models/Zadatak");

router.post("/add", validNewTask, async (req, res) => {
  // todo ovdje se ne dobije id projekta?
  const { opisZadatka, planDatPoc, planDatKraj, planBudzet, planBrSati, idVrste, idStatusa, idPrioriteta, idProjekta} = req.body;

  try {
    let newZadatak = new Zadatak(opisZadatka, planDatPoc, planDatKraj, planBudzet, null, null, null, planBrSati, null, idVrste, idStatusa, idPrioriteta, idProjekta);
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

router.get("/deletetask/:idZadatka", async (req, res) => {
  try {
    const { idZadatka } = req.params;
    const results = await Zadatak.delete(idZadatka);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




router.post("/update/:idzadatka", async (req, res) => {
  const { opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta} = req.body;
  
  try {
    console.log(opisZadatka);
    const { idzadatka } = req.params;  
    const results = await Zadatak.update(opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta, idzadatka);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:idzadatka", async (req, res) => {
  try {
    const { idzadatka } = req.params;
    const results = await Zadatak.getZadatak(idzadatka);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;