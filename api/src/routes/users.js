const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  modifyUserAdmin,
  modifyUserDisabled,
  modifyUserPassword,
  getUserById,
  getUserByEmail,
  updateUser
} = require("../controllers/controllers.js");


const { User } = require('../db');
//const { uuid } = require('uuidv4');
const { firebaseApp } = require('../firebase/firebaseConfig.js');
const { Op } = require('sequelize');
const {
	createUserWithEmailAndPassword,
	getAuth,
	sendSignInLinkToEmail,
} = require('firebase/auth');

const router = Router();


function hashFunction(key) {
  const splittedWord = key.toLowerCase().split('');
  const codes = splittedWord.map(
    (letter) => `${letter}${String(letter).charCodeAt(0)}`
  );
  return codes.join('');
}

router.post("/", async (req, res) => {
    const auth = getAuth(firebaseApp);    

    const { email, password } = req.body;
    let found = await User.findOne({ where: { email: email } });
    if (found) return res.status(400).send('User does not available');    
    try {
      // const { user } = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      const newUser = await User.create({
        //id: user.uid,
        email,
        //password: hashFunction(password),
      });
      
      const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true,
      };
      
      sendSignInLinkToEmail(auth, email, actionCodeSettings);
      res.status(200).json({ msg: 'User create!' });
    } catch(e) {
      res.status(400).json(console.log(e));
    }

});

router.post("/loginWithGoogle", async (req, res) => {
  const { email, password } = req.body;
  try {
    let found = await User.findOne({ where: { email: email } });
    if(found?.available === false) return res.status(400).send('User does not available');

    if(req.query.google && !found) {
      const newUser = await User.create({
        //id: user.uid,
        email,
        password: hashFunction(password),
      })
      console.log(newUser)
      return res.json(newUser)
    }
    if (found) {
      return res.status(200).send(found);
    } else {
      return res.status(404).send({ msg: 'sorry, this email is not exist' });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
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

router.get("/:oneUser", async (req,res) => {
  const {oneUser} = req.params
  try{
    const userFind = await getUserByEmail(oneUser)
    res.status(200).send(userFind)
  }catch(e){
    res.status(400).send("email no encontrado")
  }
})

router.put("/:email", async (req,res) => {
  try{
    const {email} = req.params
    const {username,name, lastname, telephone, dni, nationality, img} = req.body
    const userUpdate = await updateUser(email,username,name, lastname, telephone, dni, nationality, img)
    res.status(200).send(`${userUpdate} users modified`)
  }catch(e){
    res.status(404).send(e.message)
  }
})

module.exports = router;

