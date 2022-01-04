const express = require("express");
const router = express.Router();
const validNewProject = require("../middleware/validNewProject");
const Projekt = require("../models/Projekt");

router.post("/add", validNewProject, async (req, res) => {
  const { nazivProjekta, planDatPoc, planDatKraj, idVlasnika, opisProjekta} = req.body;

  try {
    let newProjekt = new Projekt(nazivProjekta, planDatPoc, planDatKraj, null, null, 1, idVlasnika, opisProjekta);
    let projekt = await newProjekt.apply();

    res.status(200);
    return res.json({ projekt });

  } catch (err) {
    console.error(err.message);
    console.log(planDatPoc + " " + planDatKraj)
    res.status(501).send("Server error");
  }
});

router.get("/alluserprojects/:idVlasnika", async (req, res) => {
 /* const { idVlasnika } = req.body;*/

  try {
    const { idVlasnika } = req.params;
    const results = await Projekt.getProjektiInfo(idVlasnika);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/update/:idProjekta", async (req, res) => {
  const { nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, opisProjekta } = req.body;
  
  try {
    const { idProjekta } = req.params;
    const results = await Projekt.update(idProjekta, nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, opisProjekta);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/delete/:idProjekta", async (req, res) => {
   try {
     const { idProjekta } = req.params;
     const results = await Projekt.delete(idProjekta);
     return res.json(results);
 
   } catch (err) {
     console.error(err.message);
     res.status(500).send("Server error");
   }
});

router.get("/:idProjekta", async (req, res) => {
  try {
    const { idProjekta } = req.params;
    const results = await Projekt.getProjekt(idProjekta);
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;