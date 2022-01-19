const express = require("express");
const router = express.Router();
const VrstaZadatka = require("../models/VrstaZadatka");

router.get("/getAll", async (req, res) => { 
    try {
      const results = await VrstaZadatka.getAllVrste();
      return res.json(results);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});
  
router.get("/:idVrste", async (req, res) => { 
    try {
      const { idVrste } = req.params;
      const results = await VrstaZadatka.getVrstaName(idVrste);
      return res.json(results);
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;