require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');


const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite requisições de qualquer origem
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


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
        res.json(userCredential.user)
       
      })
      .catch((error) => {
        res.status(400).json("usuario não cadastrado")
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
