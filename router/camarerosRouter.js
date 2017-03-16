var express = require('express');
var modelo_camarero = require('../models/camarero');
var router = express.Router();
router.put('/abrirMesa/:mesa', function(req, res) {
    modelo_camarero.abrirMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})
router.put('/cerrarMesa/:mesa', function(req, res) {
    modelo_camarero.cerrarMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})
module.exports = router;