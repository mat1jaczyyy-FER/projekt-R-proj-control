const express = require("express");
const router = express.Router();
const Uloga = require("../models/Uloga");

router.get("/:idUloge", async (req, res) => {  
     try {
       const { idUloge } = req.params;
       const results = await Uloga.getUlogaName(idUloge);
       return res.json(results);
   
     } catch (err) {
       console.error(err.message);
       res.status(500).send("Server error");
     }
});
   
module.exports = router;