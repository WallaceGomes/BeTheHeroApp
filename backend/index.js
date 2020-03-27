const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.json({
        nome: 'Wallace',
        estudando: 'ReactJS'
    });
});

app.listen(3333);