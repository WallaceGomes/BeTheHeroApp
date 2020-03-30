const express = require('express');
const crypto = require('crypto'); //pacote do node default
const connection = require('./database/connection');

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

routes.get('/ongs', async (request, response) => {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
});

routes.post('/ongs', async(request, response) => {
    const { name, email, whatsapp, city, uf } = request.body;

    //id random
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({ id });
});

module.exports = routes;