const { Router } = require("express");
const axios = require("axios");
const {
  allComments,
  coinComments,
  createComment
  } = require("../controllers/controllers.js");

const router = Router();

router.get("/allComments", async (req,res) => {
    try {
        let allComm = await allComments();
        res.status(200).json(allComm)
        // res.status(200).send("holaaa")
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.get("/:coin", async (req, res) => {
  const { coin } = req.params;
  try {
    const coinFind = await coinComments(coin);
    res.status(200).send(coinFind);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


 router.post("/comment", async (req,res) => {
      try {
          let {email,img, text, coin, stars} = req.body
          const newComment = await createComment(email,img, text, coin, stars)
          res.status(200).send(newComment)
      } catch (err) {
          res.status(400).send(err.message)
      }
  })




module.exports = router;