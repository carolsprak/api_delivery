const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Restaurante = sequelize.define('Restaurante', {
  Restaurante_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Nome: { type: DataTypes.STRING, allowNull: false },
  Endereco: { type: DataTypes.STRING, allowNull: false },
  Telefone: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 20]
    }
  }
}, {
  tableName: 'Restaurante',
  timestamps: false
});

module.exports = Restaurante;
