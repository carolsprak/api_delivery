const request = require('supertest');
const app = require('../../app');
const sequelize = require('../../config/database');
const seed = require('../../seed');
const id = 1;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await seed();
});

describe('API', function () {

  describe('get - /entregas - Lista todas as entregas com dados do pedido e entregador', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/entregas`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('post - /entregas - Cria uma nova entrega', function () {
    it('Deve retornar 201 ao criar recurso', async () => {
       const res = await request(app)
         .post(`/entregas`)
         .send({"Pedido_ID":1,"Entregador_ID":1,"Status":"Aguardando","Data_Entrega":"2025-05-13T12:00:00Z"})
         .set('Accept', 'application/json');
       expect([200, 201]).toContain(res.statusCode);
    });
  });

  describe('get - /entregas/${id} - Busca uma entrega por ID', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/entregas/${id}`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('put - /entregas/${id} - Atualiza uma entrega existente', function () {
    it('Deve atualizar o recurso e retornar status 200', async () => {
       const res = await request(app)
         .put(`/entregas/${id}`)
         .send({"Status":"Em rota","Data_Entrega":"2025-05-13T15:30:00Z"})
         .set('Accept', 'application/json');
       expect(res.statusCode).toBe(200);
    });
  });

  describe('delete - /entregas/${id} - Remove uma entrega por ID', function () {
    it('Deve retornar o status code 204 ao remover', async () => {
       const res = await request(app).delete(`/entregas/${id}`);
       expect(res.statusCode).toBe(204);
    });
  });


  describe('get - /pedidos - Lista todos os pedidos com dados do cliente e restaurante', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/pedidos`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('post - /pedidos - Cria um novo pedido', function () {
    it('Deve retornar 201 ao criar recurso', async () => {
       const res = await request(app)
         .post(`/pedidos`)
         .send({"Usuario_ID":1,"Restaurante_ID":1,"Status":"Pendente","Data_Pedido":"2025-05-13T11:00:00Z"})
         .set('Accept', 'application/json');
       expect([200, 201]).toContain(res.statusCode);
    });
  });

  describe('get - /pedidos/${id} - Busca um pedido por ID', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/pedidos/${id}`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('put - /pedidos/${id} - Atualiza um pedido existente', function () {
    it('Deve atualizar o recurso e retornar status 200', async () => {
       const res = await request(app)
         .put(`/pedidos/${id}`)
         .send({"Status":"Preparando"})
         .set('Accept', 'application/json');
       expect(res.statusCode).toBe(200);
    });
  });

  describe('delete - /pedidos/${id} - Remove um pedido por ID', function () {
    it('Deve retornar o status code 204 ao remover', async () => {
       const res = await request(app).delete(`/pedidos/${id}`);
       expect(res.statusCode).toBe(204);
    });
  });


  describe('get - /produtos - Lista todos os produtos ou filtra por restaurante_id', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/produtos`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('post - /produtos - Cria um novo produto', function () {
    it('Deve retornar 201 ao criar recurso', async () => {
       const res = await request(app)
         .post(`/produtos`)
         .send({"Nome":"Pizza de Calabresa","Descricao":"Deliciosa pizza com calabresa","Preco":39.90,"Restaurante_ID":1})
         .set('Accept', 'application/json');
       expect([200, 201]).toContain(res.statusCode);
    });
  });

  describe('get - /produtos/${id} - Busca um produto por ID', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/produtos/${id}`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('put - /produtos/${id} - Atualiza um produto existente', function () {
    it('Deve atualizar o recurso e retornar status 200', async () => {
       const res = await request(app)
         .put(`/produtos/${id}`)
         .send({"Nome":"Pizza de Frango com Catupiry","Preco":42.00})
         .set('Accept', 'application/json');
       expect(res.statusCode).toBe(200);
    });
  });

  describe('delete - /produtos/${id} - Remove um produto por ID', function () {
    it('Deve retornar o status code 204 ao remover', async () => {
       const res = await request(app).delete(`/produtos/${id}`);
       expect(res.statusCode).toBe(204);
    });
  });


  describe('get - /restaurantes - Lista todos os restaurantes', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/restaurantes`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('post - /restaurantes - Cria um novo restaurante', function () {
    it('Deve retornar 201 ao criar recurso', async () => {
       const res = await request(app)
         .post(`/restaurantes`)
         .send({"Nome":"Pizzaria Central","Endereco":"Rua das Oliveiras, 123","Telefone":"(83) 99999-0001"})
         .set('Accept', 'application/json');
       expect([200, 201]).toContain(res.statusCode);
    });
  });

  describe('get - /restaurantes/${id} - Busca um restaurante por ID', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/restaurantes/${id}`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('put - /restaurantes/${id} - Atualiza um restaurante existente', function () {
    it('Deve atualizar o recurso e retornar status 200', async () => {
       const res = await request(app)
         .put(`/restaurantes/${id}`)
         .send({"Nome":"Pizzaria Atualizada"})
         .set('Accept', 'application/json');
       expect(res.statusCode).toBe(200);
    });
  });

  describe('delete - /restaurantes/${id} - Remove um restaurante por ID', function () {
    it('Deve retornar o status code 204 ao remover', async () => {
       const res = await request(app).delete(`/restaurantes/${id}`);
       expect(res.statusCode).toBe(204);
    });
  });


  describe('get - /usuarios - Lista todos os usuários', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/usuarios`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('post - /usuarios - Cria um novo usuário', function () {
    it('Deve retornar 201 ao criar recurso', async () => {
       const res = await request(app)
         .post(`/usuarios`)
         .send({"Nome":"Carlos Motoboy","Nome_usuario":"carlosbike","Senha":"entrega123","CPF":"98765432100","Email":"carlos@email.com","Data_Nascimento":"1985-08-10T00:00:00.000Z","Endereco":"Rua da Entrega, 45","Perfil":"Entregador"})
         .set('Accept', 'application/json');
       expect([200, 201]).toContain(res.statusCode);
    });
  });

  describe('get - /usuarios/${id} - Busca um usuário por ID', function () {
    it('Deve retornar o status code 200', async () => {
       const res = await request(app).get(`/usuarios/${id}`);
       expect(res.statusCode).toBe(200);
    });
  });

  describe('put - /usuarios/${id} - Atualiza um usuário existente', function () {
    it('Deve atualizar o recurso e retornar status 200', async () => {
       const res = await request(app)
         .put(`/usuarios/${id}`)
         .send({"Nome":"João Atualizado","Email":"joao.atualizado@email.com"})
         .set('Accept', 'application/json');
       expect(res.statusCode).toBe(200);
    });
  });

  describe('delete - /usuarios/${id} - Remove um usuário por ID', function () {
    it('Deve retornar o status code 204 ao remover', async () => {
       const res = await request(app).delete(`/usuarios/${id}`);
       expect(res.statusCode).toBe(204);
    });
  });

});
