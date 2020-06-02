const knex = require('knex');
const configuration = require('../../knexfile');

//procurar depois: gerenciando variáveis ambiente no nodejs
const config =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

const connection = knex(config);

module.exports = connection;
