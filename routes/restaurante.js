const express = require('express');
const router = express.Router();
const Restaurante = require('../models/Restaurante');

/**
 * @swagger
 * /restaurantes:
 *   get:
 *     summary: Lista todos os restaurantes
 *     tags: [Restaurante]
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 */
router.get('/', async (req, res) => {
  const restaurantes = await Restaurante.findAll();
  res.json(restaurantes);
});

/**
 * @swagger
 * /restaurantes/{id}:
 *   get:
 *     summary: Busca um restaurante por ID
 *     tags: [Restaurante]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *       404:
 *         description: Restaurante não encontrado
 */
router.get('/:id', async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id);
  if (restaurante) res.json(restaurante);
  else res.status(404).json({ error: 'Restaurante não encontrado' });
});

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: Cria um novo restaurante
 *     tags: [Restaurante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Restaurante criado com sucesso
 */
router.post('/', async (req, res) => {
  const novo = await Restaurante.create(req.body);
  res.status(201).json(novo);
});

/**
 * @swagger
 * /restaurantes/{id}:
 *   put:
 *     summary: Atualiza um restaurante existente
 *     tags: [Restaurante]
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
 *         description: Restaurante atualizado
 *       404:
 *         description: Restaurante não encontrado
 */
router.put('/:id', async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id);
  if (restaurante) {
    await restaurante.update(req.body);
    res.json(restaurante);
  } else res.status(404).json({ error: 'Restaurante não encontrado' });
});

/**
 * @swagger
 * /restaurantes/{id}:
 *   delete:
 *     summary: Remove um restaurante por ID
 *     tags: [Restaurante]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Restaurante removido com sucesso
 *       404:
 *         description: Restaurante não encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Restaurante.destroy({ where: { Restaurante_ID: req.params.id } });
  res.status(deleted ? 204 : 404).send();
});

module.exports = router;
