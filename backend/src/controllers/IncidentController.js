const connection = require('../database/connection');

module.exports = {

    async listIncidents(request, response){
        const incidents = await connection('incidents').select('*');
    
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