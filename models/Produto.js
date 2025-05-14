const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  Produto_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nome: { type: DataTypes.STRING, allowNull: false },
  Descricao: { type: DataTypes.STRING, allowNull: false },
  Preco: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0 } },
  Restaurante_ID: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'Produto',
  timestamps: false
});

module.exports = Produto;
