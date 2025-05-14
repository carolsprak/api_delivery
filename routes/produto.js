const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos ou filtra por restaurante_id
 *     tags: [Produto]
 *     parameters:
 *       - in: query
 *         name: restaurante_id
 *         schema:
 *           type: integer
 *         description: ID do restaurante para filtrar
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', async (req, res) => {
  const { restaurante_id } = req.query;
  const where = restaurante_id ? { Restaurante_ID: restaurante_id } : {};
  const produtos = await Produto.findAll({ where });
  res.json(produtos);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (produto) res.json(produto);
  else res.status(404).json({ error: 'Produto não encontrado' });
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/', async (req, res) => {
  const novo = await Produto.create(req.body);
  res.status(201).json(novo);
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produto]
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
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (produto) {
    await produto.update(req.body);
    res.json(produto);
  } else res.status(404).json({ error: 'Produto não encontrado' });
});

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto por ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto removido
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Produto.destroy({ where: { Produto_ID: req.params.id } });
  res.status(deleted ? 204 : 404).send();
});

module.exports = router;
