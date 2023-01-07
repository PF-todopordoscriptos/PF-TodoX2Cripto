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
        let {email,text,coin} = req.body
        const newWarning = await createWarning(email,text,coin)
        res.status(200).send(newWarning)
    } catch (err) {
        res.status(400).send(err.message)
    }
})




router.post("/", async (req,res) => {
    try{
        let {name,heightMin, heightMax, weightMin, weightMax, lifeMin, lifeMax, img, tempers} = req.body
        await allTemps()
        const newDog = await createBreed(name,heightMin, heightMax, weightMin, weightMax, lifeMin, lifeMax, img, tempers)
        res.status(200).send(newDog)
    }catch(e){
        res.status(404).send(e.message)
    }
})


module.exports = router;