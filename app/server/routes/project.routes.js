const express = require("express");
const router = express.Router();
const validNewProject = require("../middleware/validNewProject");
const Projekt = require("../models/Projekt");
const Zadatak = require("../models/Zadatak");
const radiNa = require("../models/radiNa");
const Zaposlenik = require("../models/Zaposlenik");
const dodijeljenJe = require("../models/dodijeljenJe");

router.post("/add", validNewProject, async (req, res) => {
    const { nazivProjekta, planDatPoc, planDatKraj, idVlasnika, opisProjekta } = req.body;

    try {
        let newProjekt = new Projekt(nazivProjekta, planDatPoc, planDatKraj, null, null, 1, idVlasnika, opisProjekta);
        let projekt = await newProjekt.apply();

        let newRadiNa = new radiNa(projekt.rows[0].idprojekta, idVlasnika);
        await newRadiNa.apply();

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
        const results = await Projekt.getAllUserProjects(idVlasnika);
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

router.get("/getProjectStatistics/:idProjekta", async (req, res) => {
    try {
        const { idProjekta } = req.params;

        let projekt = (await Projekt.getProjekt(idProjekta))[0];
        let zadaci = await Zadatak.getZadatakInfo(idProjekta);

        zadaci.forEach(i => {
            i.datpoc = new Date(Date.parse(i.datpoc));
            i.datkraj = new Date(Date.parse(i.datkraj));
        });

        let results = [];

        for (let i = new Date(Date.parse(projekt.datpoc)); i < new Date(); i.setUTCDate(i.getUTCDate() + 1)) {
            results.push({
                ts: new Date(i.getTime()),
                total: zadaci.filter(j => j.datpoc && j.datpoc < i).length,
                resolved: zadaci.filter(j => j.datkraj && j.datkraj < i).length
            })
        }
        return res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/getUsersStatistics/:idProjekta", async (req, res) => {
  try {
    const { idProjekta } = req.params;
    let usersOnProject = await Projekt.getProjektWorkers(idProjekta);
    let results = [];

    for (let user of usersOnProject) {
      let fullUser = await Zaposlenik.getKorisnikFromID(user.idzaposlenika);
      let ukupnoZadataka = await dodijeljenJe.getGetProjectTasksCountForUser(fullUser[0].idzaposlenika, idProjekta);
      let obavljenoZadataka = await dodijeljenJe.getGetFinishedProjectTasksCountForUser(fullUser[0].idzaposlenika, idProjekta);

      let stat = {
        "ime": fullUser[0].imezaposlenika,
        "prezime": fullUser[0].prezimezaposlenika,
        "ukupnoZad": ukupnoZadataka[0].count,
        "obavljenoZad": obavljenoZadataka[0].count
      }
      results.push(stat);
    }

    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/dodajNaProjekt", async (req, res) => {
    const { idProjekta, idZaposlenika } = req.body;

    try {
        let newRadiNa = new radiNa(idProjekta, idZaposlenika);
        await newRadiNa.apply();
        return res.json("success");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;