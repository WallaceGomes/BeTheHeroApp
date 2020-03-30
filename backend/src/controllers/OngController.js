const connection = require('../database/connection');
const crypto = require('crypto'); //pacote do node default

module.exports = {

    async listOngs(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
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
    }
}