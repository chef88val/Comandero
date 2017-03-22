var sql = require('mysql')
var configBD = require('../bd')
var Camarero = {}
var conn = new sql.createConnection(configBD.config)
var date = new Date()
var dateformat = require('dateformat')
var fecha = dateformat(date, 'yyyy-mm-dd h:MM:ss')

var utilidades = require('../funciones_extras')
conn.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Camarero connected as id ' + conn.threadId);
});


var request = conn

Camarero.obtenerBebidas = function(callback) {
    request.query('select * from bebida order by nombre', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerCategoriasBebidas = function(callback) {
    request.query('select * from categoria_bebida order by nombre_categoria', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerBebidasCategorias = function(id, callback) {
    request.query('select * from bebida where categoria=' + id + 'order by nombre', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerBebidasMesa = function(id, callback) {
    request.query('select bm.idbebida,b.nombre as nombre , bm.cantidad from bebida_mesa bm, bebida b where bm.idbebida=b.idbebida and bm.idmesa=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerMesas = function(callback) {
    request.query('select * from mesa order by estado desc', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerMesasEstado = function(estado, callback) {
    request.query('select referencia from mesa where estado=' + estado + 'order by estado desc', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.obtenerTotalDineroMesa = function(id, callback) {
    request.query('select sum(bm.cantidad*b.precio) as total from bebida_mesa bm, bebida b where bm.idbebida=b.idbebida and bm.idmesa=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}

Camarero.abrirMesa = function(nombre, callback) {
    request.query('update mesa set estado = 1 where idmesa= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Camarero.cerrarMesa = function(nombre, callback) {
    request.query('update mesa set estado = 0 where idmesa=' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}


module.exports = Camarero