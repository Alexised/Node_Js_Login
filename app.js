
var express = require('express');
var routes = require('./routes/index');
var bodyParse = require('body-parser');
var middleware = require('./routes/middleware');
var programmers = require('./routes/programmers');
var programmersModel = require('./models/model').programmersModel;
var session = require('express-session');
var app = express();
app.use(express.static('public'));
programmers.setModel(programmersModel);
app.set('view engine', 'jade');
app.use(bodyParse.json()); //apoyar a los organismos JSON CODIFICADOS
app.use(bodyParse.urlencoded({ extended: true })); // para apoyar a los organismos urlenco
app.use(session({

    secret:"user14",
    resave: false,
    saveUnitialized: false
}));
app.get('/', routes.index);
app.post('/session', programmers.session);
app.use('/',middleware.middleware1);
app.use('/app', middleware.middleware2);
app.get('/*',middleware.middleware3);
app.get('/app/programmers', programmers.index);
app.get('/app/programmers/create', programmers.create);
app.post('/app/programmers', programmers.store);
app.get('/app/programmers/:id', programmers.show);
app.get('/app/programmers/:id/edit', programmers.edit);
app.post('/app/programmers/update/:id', programmers.update);
app.post('/app/programmers/delete/:id', programmers.destroy);
app.get('/app/close', programmers.close);

app.listen(8080);

console.log("listenIng http://localhost:8080");