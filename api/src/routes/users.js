const { Router } = require("express");
const { createUser , getAllUsers } = require("../controllers/controllers.js");


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

// router.post("/", async (req, res) => {
//   try {
//     let {
//       username,
//       password,
//       name,
//       lastname,
//       email,
//       telephone,
//       dni,
//       nationality,
//     } = req.body;
//     const newUser = await createUser(
//       username,
//       password,
//       name,
//       lastname,
//       email,
//       telephone,
//       dni,
//       nationality
//     );
//     res.status(200).send(newUser);
//   } catch (err) {
//     res.status(404).send(err.message);
//   }
// });

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
      res.status(201).json({ msg: 'User create!' });
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
    const allUsers = await getAllUsers()
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;