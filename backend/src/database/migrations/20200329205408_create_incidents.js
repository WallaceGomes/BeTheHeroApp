
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments(); //chave primária

        table.string('title').notNullable(); //notNullable: Não pode ficar vazio
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); //chave estrangeira

        table.foreign('ong_id').references('id').inTable('ongs'); //relacionamento
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
