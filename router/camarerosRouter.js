var express = require('express');
var modelo_camarero = require('../models/camarero');
var router = express.Router();
router.put('/abrirMesa/:mesa', function(req, res) {
    modelo_camarero.abrirMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})
router.put('/cambiarEstadoMesa/:mesa', function(req, res) {
    modelo_camarero.cambiarEstadoMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})

router.post('/addPagoMesa/:mesa/:tipo/:cantidad', function(req, res) {
    modelo_camarero.addPagoMesa(req.params.mesa, req.params.tipo, req.params.cantidad, function(err, data) {
        res.send(data);
    });
})

router.put('/pedirPlato/:mesa/:plato', function(req, res) {
    console.log(req.params.mesa, req.params.plato)
    modelo_camarero.pedirPlato(req.params.mesa, req.params.plato, function(err, data) {
        res.send(data);
    });
})

router.put('/cerrarMesa/:mesa', function(req, res) {
    modelo_camarero.cerrarMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})
module.exports = router;