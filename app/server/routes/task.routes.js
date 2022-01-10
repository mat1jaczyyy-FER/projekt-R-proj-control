const express = require("express");
const router = express.Router();
const validNewTask = require("../middleware/validNewTask");
const Zadatak = require("../models/Zadatak");
const Projekt = require("../models/Projekt");
const Zaposlenik = require("../models/Zaposlenik");
const dodijeljenJe = require("../models/dodijeljenJe");

router.post("/add", validNewTask, async (req, res) => {
    // todo ovdje se ne dobije id projekta?
    const { opisZadatka, planDatPoc, planDatKraj, planBudzet, planBrSati, idVrste, idStatusa, idPrioriteta, idProjekta } = req.body;

    try {
        let newZadatak = new Zadatak(opisZadatka, planDatPoc, planDatKraj, null, null, null, null, planBrSati, null, 1, idStatusa, idPrioriteta, idProjekta);
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

        for (const i of results) {
            i.dodijeljenJe = [];
            for (const j of await dodijeljenJe.getdodijeljenJeZadatak(i.idzadatka)) {
                i.dodijeljenJe.push((await Zaposlenik.getKorisnikFromID(j.idzaposlenika))[0])
                // TODO vuln lozinka korisnika se ovdje dohvaca...
            }
        }

        return res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/allusertasks/:idZaposlenika", async (req, res) => {
    try {
        const { idZaposlenika } = req.params;

        let ids = await dodijeljenJe.getdodijeljenJeKorisnik(idZaposlenika);
        let results = [];

        for (const i of ids) {
            let zadatak = (await Zadatak.getZadatak(i.idzadatka))[0];
            results.push({
                zadatak: zadatak,
                projekt: (await Projekt.getProjekt(zadatak.idprojekta))[0]
            });
        }

        return res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/delete/:idZadatka", async (req, res) => {
    try {
        const { idZadatka } = req.params;
        const results = await Zadatak.delete(idZadatka);
        return res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



router.post("/editzadatka/:idzadatka", async (req, res) => {
    const { brSati, idStatusa } = req.body;

    try {
        const { idzadatka } = req.params;
        const results = await Zadatak.edit(idzadatka, idStatusa, brSati);
        return res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


router.post("/update/:idzadatka", async (req, res) => {
    const { opisZadatka, planDatPoc, planDatKraj, planBudzet, budzet, datPoc, datKraj, planBrSati, brSati, idVrste, idStatusa, idPrioriteta, idProjekta } = req.body;

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