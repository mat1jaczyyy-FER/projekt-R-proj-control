const express = require("express");
const router = express.Router();
const PrioritetZadatka = require("../models/PrioritetZadatka");

router.get("/getAll", async (req, res) => { 
    try {
      const results = await PrioritetZadatka.getAllPrioritetiZadataka();
      return res.json(results);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});
  
router.get("/:idPrioriteta", async (req, res) => { 
    try {
      const { idPrioriteta } = req.params;
      const results = await PrioritetZadatka.getPrioritetZadatkaName(idPrioriteta);
      return res.json(results);
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;