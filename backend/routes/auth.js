const express = require('express');
const router = express.Router();

// rota de cadastro simples (não persiste em DB)
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  // Aqui você integraria com banco de dados; por enquanto retornamos um mock
  const user = { id: Date.now(), name, email };
  return res.status(201).json({ user });
});

module.exports = router;
