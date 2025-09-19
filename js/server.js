// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'votre_clé_secrète';

app.use(cors());
app.use(express.json());

// Simuler une base d'utilisateurs
const users = [
  {
    id: 1,
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "John Doe",
  },
  {
    id: 2,
    email: "jane@example.com",
    password: bcrypt.hashSync("mypassword", 10),
    name: "Jane Smith",
  },
];

// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token, name: user.name });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});