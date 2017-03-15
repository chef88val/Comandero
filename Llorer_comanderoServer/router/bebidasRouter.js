var express = require('express');
var modelo_bebidas = require('../models/bebidas');
var router = express.Router();


router.post('/insertarBebida/:idmesa/:idbebida/:cantidad', function(req, res) {
    modelo_bebidas.insertarBebida(req.params.idmesa, req.params.idbebida, req.params.cantidad, function(err, data) {
        res.send(data);
    });
})

router.put('/actualizarBebida/:idmesa/:idbebida/:cantidad', function(req, res) {
    modelo_bebidas.actualizarBebida(req.params.idmesa, req.params.idbebida, req.params.cantidad, function(err, data) {
        res.send(data);
    });
})

router.post('/borrarBebida/:idmesa/:idbebida', function(req, res) {
    modelo_bebidas.borrarBebida(req.params.idmesa, req.params.idbebida, function(err, data) {
        res.send(data);
    });
})
module.exports = router;