const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const users = require("./users.js");
const coins = require("./coins.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/users", users);
router.use("/coins", coins);

module.exports = router;