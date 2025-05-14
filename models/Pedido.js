const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  Pedido_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Usuario_ID: { type: DataTypes.INTEGER, allowNull: false },
  Restaurante_ID: { type: DataTypes.INTEGER, allowNull: false },
  Data_Pedido: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  Status: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Pendente', 'Preparando', 'Enviado', 'Entregue']]
    }
  }
}, {
  tableName: 'Pedido',
  timestamps: false
});

module.exports = Pedido;
