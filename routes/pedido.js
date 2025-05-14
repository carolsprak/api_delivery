const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
const Restaurante = require('../models/Restaurante');

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos com dados do cliente e restaurante
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', async (req, res) => {
  const pedidos = await Pedido.findAll({
    include: [
      { model: Usuario, attributes: ['Nome', 'Email'] },
      { model: Restaurante, attributes: ['Nome', 'Endereco'] }
    ]
  });
  res.json(pedidos);
});

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Busca um pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id, {
    include: [Usuario, Restaurante]
  });
  if (pedido) res.json(pedido);
  else res.status(404).json({ error: 'Pedido não encontrado' });
});

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Pedido criado
 */
router.post('/', async (req, res) => {
  const novo = await Pedido.create(req.body);
  res.status(201).json(novo);
});

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags: [Pedido]
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
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
router.put('/:id', async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (pedido) {
    await pedido.update(req.body);
    res.json(pedido);
  } else res.status(404).json({ error: 'Pedido não encontrado' });
});

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pedido removido
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Pedido.destroy({ where: { Pedido_ID: req.params.id } });
  res.status(deleted ? 204 : 404).send();
});

module.exports = router;
