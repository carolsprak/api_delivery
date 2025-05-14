const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entrega = sequelize.define('Entrega', {
  Entrega_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Pedido_ID: { type: DataTypes.INTEGER, allowNull: false },
  Entregador_ID: { type: DataTypes.INTEGER, allowNull: false },
  Status: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Aguardando', 'Em rota', 'Entregue']]
    }
  },
  Data_Entrega: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'Entrega',
  timestamps: false
});

module.exports = Entrega;
