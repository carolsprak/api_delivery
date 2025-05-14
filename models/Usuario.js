const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    Usuario_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nome: { type: DataTypes.STRING, allowNull: false },
    Nome_usuario: { type: DataTypes.STRING, allowNull: false, unique: false },
    Senha: { type: DataTypes.STRING, allowNull: false },
    CPF: { type: DataTypes.STRING, allowNull: false, unique: false },
    Email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    Data_Nascimento: { type: DataTypes.DATE, allowNull: false },
    Endereco: { type: DataTypes.STRING, allowNull: false },
    Perfil: { 
      type: DataTypes.ENUM('Cliente', 'Prestador', 'Entregador'),
      allowNull: false 
    }
  }, {
    tableName: 'Usuario',
    timestamps: false
  });
  

module.exports = Usuario;
