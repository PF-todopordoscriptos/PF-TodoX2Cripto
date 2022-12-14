const { initializeApp, applicationDefault } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");


const firebaseConfig = {
  credential: applicationDefault(),
  //credential: admin.credential.cert(serviceAccount),
};
const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
  auth: getAuth(firebaseApp),
};

