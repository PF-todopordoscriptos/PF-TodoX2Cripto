const { initializeApp, applicationDefault } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
//var serviceAccount = require("C:Users\ricarDesktopPF HENRYPF-TodoX2Criptoapisrc\firebase\todox2cripto-firebase.json");
//var serviceAccount = require("C:/Usuarios/ricar/Escritorio/firebase.json");

const firebaseConfig = {
  credential: applicationDefault(),
  //credential: admin.credential.cert(serviceAccount),
};
const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
  auth: getAuth(firebaseApp),
};

