// Import the functions you need from the SDKs you need
const debug = require("debug")("social-network:firebase");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.FIRE_BASE_API_KEY}`,
  authDomain: "social-network-ba6d7.firebaseapp.com",
  projectId: "social-network-ba6d7",
  storageBucket: "social-network-ba6d7.appspot.com",
  messagingSenderId: "1065196619346",
  appId: "1:1065196619346:web:d10c57f35a80753a37018b",
};
debug("run firebase");

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = storage;
