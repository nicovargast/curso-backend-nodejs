const express = require("express");
const app = express();

const { config } = require('./config/index');
/*
Rutas de ejemplo:
app.get('/', function(req, res) { 
    res.send("hello world");
})

app.get('/json', function(req, res) { 
    res.json({ hello: 'world' });
});

app.get('/bisiesto/:anio', function (req, res) {
    let anio = req.params.anio;
    if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0)
      res.send(`El año ${anio} es bisiesto.`);
    else res.send(`El año ${anio} no es bisiesto.`);
  });*/

const moviesApi = require('./routes/movies');

// Middleware body parser
// Esto permite que al enviar datos en formato json en POST, este pueda interpretarlos
app.use(express.json());

moviesApi(app);


app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});



  