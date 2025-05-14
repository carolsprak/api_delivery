const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery API',
      version: '1.0.0',
      description: 'Documentação da API de delivery. 👉 <a href="/swagger.json" target="_blank">Acesse o swagger.json</a>',
    },
  },
  apis: ['./routes/*.js'],  
};

module.exports = swaggerJSDoc(options);
