var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


const { stringify } = require('querystring');
var app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));



//connect 
const url = 'mongodb+srv://root:12345@clusteratividade01.1uyou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(
    url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    }
)


//Mongoose Scherma definition
var Scherma = mongoose.Schema;
var CarroScherma = new Scherma({
    fabricante: String,
    modelo: String,
    ano: Number,
    preco: Number
});

//Mongoose Model definition
var Carro = mongoose.model('carros', CarroScherma);


//exemplo de um carro no formato JSON
//{ "fabricante": "Ford", "modelo": "Ka", "ano": 2010, "preco": 11000}
//---
app.get('/', function (req, res) {
    res.end('Bem vindo API Carros');
})

app.get('/carros', function (req, res) {
    Carro.find({}, function (error, documents) {
        if (error)
            res.send(err);
        res.json(documents);
    });
})


//add car
app.post('/carros', function (req, res) {
    var c = new Carro();

    c.fabricante = req.body.fabricante;
    c.modelo = req.body.modelo;
    c.ano = req.body.ano;
    c.preco = req.body.preco;

    c.save(function(err){
        if(err)
        res.send(err);

        res.json({message: 'Carro criado no Mongo!'});
    });
})

//remove car
app.delete('/carros/:id', function(req, res){
    Carro.remove({_id:req.params.id}, function(err, c){
        if(err)
            res.send(err);

            res.json({message:'Removido!'});
    });
})

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});

