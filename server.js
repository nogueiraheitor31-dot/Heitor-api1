require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Pool de conexões
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

// POST /usuarios - cria um registro
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Campos nome e email são obrigatórios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }
    res.status(500).json({ erro: 'Erro interno ao criar usuário.' });
  }
});

// GET /usuarios - lista todos
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao listar usuários.' });
  }
});

// PUT /usuarios/:id - atualiza um registro
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Campos nome e email são obrigatórios.' });
    }
    const [result] = await pool.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    res.status(200).json({ id: Number(id), nome, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
  }
});

// DELETE /usuarios/:id - remove um registro
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao remover usuário.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
