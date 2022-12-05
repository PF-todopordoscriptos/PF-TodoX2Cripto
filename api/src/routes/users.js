const { Router } = require("express");
const { createUser } = require("../controllers/controllers.js");
const { User } = require ('../db.js');

const router = Router();

router.post("/", async (req, res) => {
  try {
    let {
      username,
      password,
      name,
      lastname,
      email,
      telephone,
      dni,
      nationality,
    } = req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      lastname,
      email,
      telephone,
      dni,
      nationality
    );
    res.status(200).send(newUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/", async (req, res) => {
  let user = await User.findAll();
  console.log(user);
  try {
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
