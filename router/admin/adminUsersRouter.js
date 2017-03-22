var express = require('express');
//var modelo_admin = require('../models/admin')
/*var app = express()
app.use('/users', usersRouter)*/
var router = express.Router();
router.get('/', function(req, res) {
    res.send('¡Soy el panel de administración!');
});

//users page (http://localhost:1337/admin/users)
router.get('/users', function(req, res) {
    res.send('¡Muestro todos los usuarios!');
});
//ruta con parámetros (http://localhost:1337/admin/users/:name)
router.get('/users/:name', function(req, res) {
    res.send('hola ' + req.params.name + '!');
});

module.exports = router;