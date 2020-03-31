const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

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

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.listOngs);

routes.post('/ongs', OngController.create);


routes.get('/profile', ProfileController.listOngIncidents);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.listIncidents);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;