const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  modifyUserAdmin,
  modifyUserDisabled,
  modifyUserPassword,
  getUserById,
} = require("../controllers/controllers.js");

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

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/modifyUserAdmin", async (req, res) => {
  const { id, admin } = req.body;
  try {
    await modifyUserAdmin(id, admin);
    const findUser = await getUserById(id);
    res.status(200).send(findUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/modifyUserDisabled", async (req, res) => {
  const { id, disabled } = req.body;
  try {
    await modifyUserDisabled(id, disabled);
    const findUser = await getUserById(id);
    res.status(200).send(findUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put("/modifyUserPassword", async (req, res) => {
  const { id, password } = req.body;
  try {
    await modifyUserPassword(id, password);
    const findUser = await getUserById(id);
    res.status(200).send(findUser);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
