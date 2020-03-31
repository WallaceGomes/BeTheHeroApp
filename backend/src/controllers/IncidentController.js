const connection = require('../database/connection');

module.exports = {

    //paginação: caso não tenha na no query, seta a page como 1
    //carrega somente 5 casos por página
    //offset => pula uma quantidade definida de itens
    async listIncidents(request, response){
        const { page = 1 } = request.query;
        //retorna a quantidade de casos no BD
        const [count] = await connection('incidents').count();

        //retorna todas as informações dos incidents com as da ong responsável
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1 ) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); // parei faltando 8min
    
        //retorna a quantidade de itens na tabela incidents
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async listOngIncidents(request, response){
        const ong_id = request.params;
        const incidents = await connection('incidents').where('ong_id', ong_id ).select('ong_id');
    
        return response.json(incidents);
    },

    async create(request, response) {
    const { title, description, value } = request.body;
    //geralmente informações relacionadas à login são transmitidas pelo Header
    const ong_id = request.headers.authorization; //authorization: campo definido pelo dev no header

    //cadastra um caso no BD e retorna o id do mesmo
    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
    });

    return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not allowed.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}