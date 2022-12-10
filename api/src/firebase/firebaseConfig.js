// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHxWaDc7lZ76US3CEzk69NUjShv63hJUU",
  authDomain: "cripto-henry.firebaseapp.com",
  projectId: "cripto-henry",
  storageBucket: "cripto-henry.appspot.com",
  messagingSenderId: "655606830570",
  appId: "1:655606830570:web:ae143443a261b911820e93"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

module.exports = {
    auth : getAuth(firebaseApp)
}