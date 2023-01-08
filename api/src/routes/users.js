const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  modifyUserAdmin,
  modifyUserDisabled,
  modifyUserPassword,
  getUserById,
  getUserByEmail,
  updateUser,
  postAdminChanges,
  getAllAdminChanges,
  addCoinsUser,
  getHistoric,
  addCoinsUserCart,
  finishTransactions,
  getCoinsUserCart
} = require("../controllers/controllers.js");

const { User } = require("../db");
//const { uuid } = require('uuidv4');
const { firebaseApp } = require("../firebase/firebaseConfig.js");
const { Op } = require("sequelize");
const {
  createUserWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
} = require("firebase/auth");
const mercadopago = require("mercadopago");
const { preferences } = require("mercadopago");
require("dotenv").config();
mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY})

const router = Router();

function hashFunction(key) {
  const splittedWord = key.toLowerCase().split("");
  const codes = splittedWord.map(
    (letter) => `${letter}${String(letter).charCodeAt(0)}`
  );
  return codes.join("");
}
router.get("/getTransactions", async (req, res) => {
  try {
    const historic = await getHistoric();
    res.status(200).send(historic);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post("/", async (req, res) => {
  const auth = getAuth(firebaseApp);

  const { email, password } = req.body;
  let found = await User.findOne({ where: { email: email } });
  if (found) return res.status(400).send("User does not available");
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
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings);
    res.status(200).json({ msg: "User create!" });
  } catch (e) {
    res.status(400).json(console.log(e));
  }
});

router.post("/loginWithGoogle", async (req, res) => {
  const { email, password } = req.body;
  try {
    let found = await User.findOne({ where: { email: email } });
    if (found?.available === false)
      return res.status(400).send("User does not available");

    if (req.query.google && !found) {
      const newUser = await User.create({
        //id: user.uid,
        email,
        password: hashFunction(password),
      });
      console.log(newUser);
      return res.json(newUser);
    }
    if (found) {
      return res.status(200).send(found);
    } else {
      return res.status(404).send({ msg: "sorry, this email is not exist" });
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

router.get("/allAdminChanges", async (req, res) => {
  try {
    const allChanges = await getAllAdminChanges();
    res.status(200).send(allChanges);
  } catch (e) {
    res.status(400).send(e.message);
  }
});



router.post("/adminChanges", async (req, res) => {
  const {
    idAdmin,
    emailAdmin,
    idUser,
    emailUser,
    idCoin,
    nameCoin,
    dataModified,
    newValue,
  } = req.body;
  try {
    const saveLog = await postAdminChanges(
      idAdmin,
      emailAdmin,
      idUser,
      emailUser,
      idCoin,
      nameCoin,
      dataModified,
      newValue
    );
    return res.status(200).send(saveLog);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/addTransaction", async (req, res) => {
  try {
    const { idUser, idCoin, quantity, price } = req.body;
    let transaction = addCoinsUser(idUser, idCoin, quantity, price);
    res.status(200).send(transaction);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/addTransactionCart", async (req, res) => {
  try {
    const { idUser, idCoin, quantity, price } = req.body;
    let transaction = addCoinsUserCart(idUser, idCoin, quantity, price);
    res.status(200).send(transaction);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get("/transactionCart/:idUser", async (req, res) => {
  try {
    const { idUser} = req.params;
    let transaction =await getCoinsUserCart(idUser);
    res.status(200).json(transaction);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.delete("/finishTransactions/:idUser", async(req, res) =>{
  try{
    const { idUser } = req.params;
    let validation= finishTransactions(idUser)
        res.status(200).json(validation);
      } catch (err) {
        res.status(400).json(err.message);
      }
    });


router.post("/payment", async (req, res) => {
  const product = req.body;
  try {
    let qq = []
    function pusher() {
      product.map((e) => {
        qq.push({
          id: product.indexOf(e),
          title: product[product.indexOf(e)].amount + " " + product[product.indexOf(e)].title,
          quantity: 1,
          unit_price: (parseFloat(product[product.indexOf(e)].price) / 10) + parseFloat(product[product.indexOf(e)].price),
          currency_id: 'ARS',
        })
       })
    }
    pusher()
    let preference = {
      items: qq,
      payer: {
        type: "customer",
        id: "4085428740137259"
      },
      back_urls: {
        success: 'http://localhost:3000',
        failure: '',
        pending: ''
      },
      auto_return: 'approved',
      binary_mode: true
    }
    mercadopago.preferences.create(preference)
    .then((response) => res.status(200).send({response}))
    .catch((e) => res.status(404).send.apply(e.message))
  } catch (e) {
    res.status(404).send(e.message);
  }
});
router.get("/:oneUser", async (req, res) => {
  const { oneUser } = req.params;
  try {
    const userFind = await getUserByEmail(oneUser);
    res.status(200).send(userFind);
  } catch (e) {
    res.status(400).send("email no encontrado");
  }
});

router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { username, name, lastname, /*telephone, dni,*/ nationality, img } =
      req.body;
    const userUpdate = await updateUser(
      email,
      username,
      name,
      lastname,
      // telephone,
      // dni,
      nationality,
      img
    );
    res.status(200).send(`${userUpdate} users modified`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});



module.exports = router;
