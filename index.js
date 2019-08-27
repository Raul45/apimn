const express = require('express');
const app = express();

const {config} = require('./config/index');
const moviesApi2 = require('./routes/movies.js').moviesApi;

const {logErrors, wrapErrors, errorHandler} = require('./middleware/errorHandlers.js');
const notFoundHandler = require('./middleware/notFoundHandler');
//body parser
app.use(express.json());
moviesApi2(app);

///manejador de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);



//catch 404
app.use(notFoundHandler);

app.listen(config.port, function(){
    console.log(`Escuchando en ${config.port}`);
});