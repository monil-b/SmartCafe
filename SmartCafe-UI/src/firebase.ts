import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCalR3vqlbHTAtEMiPkfA4F9HQonLvUOG0",

  authDomain: "smartcafe-577d6.firebaseapp.com",

  projectId: "smartcafe-577d6",

  storageBucket: "smartcafe-577d6.firebasestorage.app",

  messagingSenderId:"929031772303",

  appId: "1:929031772303:web:bbf4d4640c774dcb3c78fa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);