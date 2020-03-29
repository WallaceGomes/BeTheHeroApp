const express = require('express');

const routes = express.Router();

/*

    Tipos de parâmetros

    Query: Parâmetros nomeados enviados na rota após "?"
        Geralmente para filtros e paginação
    Route: Parâmetros usados para identificar recursos
    Request body: Corpo da requisição, utilizado para criar ou alterar recursos

    Banco de dados

    Driver: SELECT * FROM users
    Query Builder: table('users').select(*).where()

    Será utilizado como Query Builder o KNEX (npm)

*/


routes.get('/', (req, res) => {
    return res.json({
        nome: 'Wallace',
        estudando: 'ReactJS'
    });
});

module.exports = routes;