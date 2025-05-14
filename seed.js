const { Usuario, Restaurante, Produto, Pedido, Entrega } = require('./models');
const sequelize = require('./config/database');

module.exports = async function seed() {
  await sequelize.sync({ force: true });

  const cliente = await Usuario.create({
    Nome: 'João Silva',
    Nome_usuario: 'joaosilva',
    Senha: '123456',
    CPF: '12345678900',
    Email: 'joao@email.com',
    Data_Nascimento: '1990-01-01',
    Endereco: 'Rua das Flores, 123',
    Perfil: 'Cliente'
  });

  const entregador = await Usuario.create({
    Nome: 'Carlos Motoboy',
    Nome_usuario: 'carlosbike',
    Senha: 'entrega123',
    CPF: '98765432100',
    Email: 'carlos@email.com',
    Data_Nascimento: '1985-08-10',
    Endereco: 'Rua da Entrega, 45',
    Perfil: 'Entregador'
  });

  const restaurante = await Restaurante.create({
    Nome: 'Pizzaria do Zé',
    Endereco: 'Avenida Central, 456',
    Telefone: '(83) 99999-0000'
  });

  const produto = await Produto.create({
    Nome: 'Pizza de Calabresa',
    Descricao: 'Deliciosa pizza com bastante calabresa',
    Preco: 35.90,
    Restaurante_ID: restaurante.Restaurante_ID
  });

  const pedido = await Pedido.create({
    Usuario_ID: cliente.Usuario_ID,
    Restaurante_ID: restaurante.Restaurante_ID,
    Data_Pedido: new Date(),
    Status: 'Pendente'
  });

  await Entrega.create({
    Pedido_ID: pedido.Pedido_ID,
    Entregador_ID: entregador.Usuario_ID,
    Status: 'Em rota',
    Data_Entrega: null
  });

  console.log(' Base populada com sucesso!');
   
};
 
