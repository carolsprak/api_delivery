const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) res.json(usuario);
  else res.status(404).json({ error: 'Usuário não encontrado' });
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', async (req, res) => {
  try {
  const novo = await Usuario.create(req.body);
  res.status(201).json(novo);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    await usuario.update(req.body);
    res.json(usuario);
  } else res.status(404).json({ error: 'Usuário não encontrado' });
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Usuario.destroy({ where: { Usuario_ID: req.params.id } });
  res.status(deleted ? 204 : 404).send();
});

module.exports = router;
