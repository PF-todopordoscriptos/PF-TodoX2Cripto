const { Router } = require("express");
const axios = require("axios");
const {
    allWarnings,
    createWarning
  } = require("../controllers/controllers.js");

const router = Router();

router.get("/allWarnings", async (req,res) => {
    try {
        let warningsText = await allWarnings();
        res.status(200).json(warningsText)
        // res.status(200).send("holaaa")
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post("/warnings", async (req,res) => {
    try {
        let {email, img, text, coin, coinImg} = req.body
        const newWarning = await createWarning(email, img, text, coin, coinImg)
        res.status(200).send(newWarning)
    } catch (err) {
        res.status(400).send(err.message)
    }
})



module.exports = router;