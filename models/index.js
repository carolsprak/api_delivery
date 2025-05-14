const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const Produto = require('./Produto');
const Restaurante = require('./Restaurante');
const Entrega = require('./Entrega');

// Pedido <-> Usuario
Usuario.hasMany(Pedido, { foreignKey: 'Usuario_ID' });
Pedido.belongsTo(Usuario, { foreignKey: 'Usuario_ID' });

// Pedido <-> Restaurante
Restaurante.hasMany(Pedido, { foreignKey: 'Restaurante_ID' });
Pedido.belongsTo(Restaurante, { foreignKey: 'Restaurante_ID' });

// Restaurante <-> Produto
Restaurante.hasMany(Produto, { foreignKey: 'Restaurante_ID' });
Produto.belongsTo(Restaurante, { foreignKey: 'Restaurante_ID' });

// Entrega <-> Pedido
Pedido.hasOne(Entrega, { foreignKey: 'Pedido_ID' });
Entrega.belongsTo(Pedido, { foreignKey: 'Pedido_ID' });

// Entrega <-> Usuario (Entregador)
Usuario.hasMany(Entrega, { foreignKey: 'Entregador_ID' });
Entrega.belongsTo(Usuario, { foreignKey: 'Entregador_ID' });

module.exports = {
  Usuario,
  Pedido,
  Produto,
  Restaurante,
  Entrega,
};
