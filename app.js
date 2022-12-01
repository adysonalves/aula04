const express = require('express');
const mysql = require('mysql2');
const connect = require('./conexao');

// Aplicação
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// ROTAS
app.get('/', (req,res) => {
    res.send('A API está rodando!');
    res.end();
});


// ROTA DE EXIBIÇÃO DE CLIENTES COM BASE NO ID
app.get('/clientes/:id?', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    const id = req.params.id;

    if(!id){
     return connect('select * from cliente', res);
     }
     return connect(`SELECT * FROM cliente WHERE id=${id}`, res);
    
});

// ROTA DE ALTERAÇÃO DE CLIENTE COM BASE NO ID
app.put('/clientes/:id', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    const id = req.params.id;
    const nome = req.body.nome;

    connect(`update cliente set nome="${nome}" where id=${id}`,res);
});

// ROTA DE INCLUSÃO DE NOVO CLIENTE

app.post('/clientes/add', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    const nome = req.body.nome;

    return connect(`INSERT INTO cliente(nome) VALUES("${nome}")`, res);
});

// ROTA DE EXCLUSÃO DE CLIENTE
app.delete('/clientes/:id', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    const id = req.params.id;

    connect(`DELETE FROM cliente WHERE id=${id}`, res);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
})