const express = require('express');
const cors = require('cors');  
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger'); 

const models = require('./models');
const usuarioRoutes = require('./routes/usuario');
const produtoRoutes = require('./routes/produto');
const pedidoRoutes = require('./routes/pedido');
const entregaRoutes = require('./routes/entrega');
const restauranteRoutes = require('./routes/restaurante');

const app = express();
app.use(cors());
app.use(express.json());

// Serve Swagger JSON em /swagger.json
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(swaggerSpec, null, 2));
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/entregas', entregaRoutes);
app.use('/restaurantes', restauranteRoutes);

// Iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});

if (require.main === module) {
  sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  });
}
module.exports = app;