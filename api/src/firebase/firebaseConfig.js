// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeHSvqz_em9AXWAJ3eaVsh5awjUV5zXkw",
  authDomain: "todox2cripto.firebaseapp.com",
  projectId: "todox2cripto",
  storageBucket: "todox2cripto.appspot.com",
  messagingSenderId: "211613892756",
  appId: "1:211613892756:web:0056094c3ac93a53113481",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
  auth: getAuth(firebaseApp),
};
