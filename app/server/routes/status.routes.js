const express = require("express");
const router = express.Router();
const Status = require("../models/Status");

router.get("/getAll", async (req, res) => { 
  try {
    const results = await Status.getAllStatuses();
    return res.json(results);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

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