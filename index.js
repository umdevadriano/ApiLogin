require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');


const app = express();
app.use(bodyParser.json());

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};
// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const appFirebase = firebase.initializeApp(firebaseConfig);
    const auth = firebaseAuth.getAuth(appFirebase);
  
    firebaseAuth.signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        res.json(userCredential)
      })
      .catch((error) => {
        res.json(error)
      });
  });
app.post('/', async (req, res) => {
  try {
    res.status(200).send("certo por aqui");
  }catch{
    res.status(400).send('deu ruin');
  }
});

// Porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
