const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const router = express.Router();
const SECRET_KEY = "votre_cle_secrete";

// Utilisateurs avec mots de passe hachés
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
router.post('/login', (req, res) => {
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

module.exports = router;