var express = require('express');
var modelo_platos = require('../models/platos');
var router = express.Router();


router.post('/insertarPlato/:idmesa/:idplato/:cantidad', function(req, res) {
    modelo_platos.insertarPlato(req.params.idmesa, req.params.idplato, req.params.cantidad, function(err, data) {
        res.send(data);
    });
})

router.put('/actualizarPlato/:idmesa/:idplato/:cantidad', function(req, res) {
    modelo_platos.actualizarPlato(req.params.idmesa, req.params.idplato, req.params.cantidad, function(err, data) {
        res.send(data);
    });
})

router.post('/borrarPlato/:idmesa/:idplato', function(req, res) {
    modelo_platos.borrarPlato(req.params.idmesa, req.params.idplato, function(err, data) {
        res.send(data);
    });
})
module.exports = router;