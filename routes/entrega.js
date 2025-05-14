const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');

/**
 * @swagger
 * /entregas:
 *   get:
 *     summary: Lista todas as entregas com dados do pedido e entregador
 *     tags: [Entrega]
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get('/', async (req, res) => {
  const entregas = await Entrega.findAll({
    include: [
      { model: Pedido },
      { model: Usuario, attributes: ['Nome', 'Perfil'] }
    ]
  });
  res.json(entregas);
});

/**
 * @swagger
 * /entregas/{id}:
 *   get:
 *     summary: Busca uma entrega por ID
 *     tags: [Entrega]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Entrega encontrada
 *       404:
 *         description: Entrega não encontrada
 */
router.get('/:id', async (req, res) => {
  const entrega = await Entrega.findByPk(req.params.id, {
    include: [Pedido, Usuario]
  });
  if (entrega) res.json(entrega);
  else res.status(404).json({ error: 'Entrega não encontrada' });
});

/**
 * @swagger
 * /entregas:
 *   post:
 *     summary: Cria uma nova entrega
 *     tags: [Entrega]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Entrega criada
 */
router.post('/', async (req, res) => {
  const nova = await Entrega.create(req.body);
  res.status(201).json(nova);
});

/**
 * @swagger
 * /entregas/{id}:
 *   put:
 *     summary: Atualiza uma entrega existente
 *     tags: [Entrega]
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
 *         description: Entrega atualizada
 *       404:
 *         description: Entrega não encontrada
 */
router.put('/:id', async (req, res) => {
  const entrega = await Entrega.findByPk(req.params.id);
  if (entrega) {
    await entrega.update(req.body);
    res.json(entrega);
  } else res.status(404).json({ error: 'Entrega não encontrada' });
});

/**
 * @swagger
 * /entregas/{id}:
 *   delete:
 *     summary: Remove uma entrega por ID
 *     tags: [Entrega]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Entrega removida
 *       404:
 *         description: Entrega não encontrada
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Entrega.destroy({ where: { Entrega_ID: req.params.id } });
  res.status(deleted ? 204 : 404).send();
});

module.exports = router;
