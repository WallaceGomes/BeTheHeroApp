exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
        table.string('id').primary();
        table.string('name').notNullable(); //notNullable: Não pode ficar vazio
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); //o segundo parâmetro delimita a quantidade de caracteres
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
