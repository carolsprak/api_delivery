# Delivery API – Testes Automatizados e Comparação de Swagger

Projeto de backend Node.js com Sequelize, documentação via Swagger e testes automatizados usando SuperTest. Inclui script para comparar versões do Swagger.

---

## 📦 Requisitos

- Node.js >= 18
- SQlite, Postgresql ou outro banco compatível com Sequelize 

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Acessar o Swagger
```bash
node app.js
```
- http://localhost:3000/api-docs/
- http://localhost:3000/swagger.json

### 3. Comparar mudanças no swagger
```bash
cd comparador
./mudancas_swagger.sh swagger20250510.json swagger20250513.json
```

### 4. Gerar os testes de API com Supertest
```bash
cd ..
cd gerador
./swagger2supertest.sh
```

### 5. Executar os testes de API com Supertest
```bash
npm test
```