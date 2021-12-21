const express = require("express");
const router = express.Router();
const Status = require("../models/Status");

router.get("/:idStatusa", async (req, res) => { 
     try {
       const { idStatusa } = req.params;
       const results = await Status.getStatusName(idStatusa);
       return res.json(results);
   
     } catch (err) {
       console.error(err.message);
       res.status(500).send("Server error");
     }
});
   
module.exports = router;