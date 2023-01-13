const { initializeApp, applicationDefault } = require("firebase-admin/app");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
//const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const serviceAccount = require("/etc/secrets/GOOGLE_APPLICATION_CREDENTIALS");


const firebaseConfig = {
  //credential: applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
};
const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
  auth: getAuth(firebaseApp),
};

