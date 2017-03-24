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
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerCategoriasBebidas = function(callback) {
    request.query('select * from categoria_bebida order by nombre_categoria', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerBebidasCategorias = function(id, callback) {
    console.log('select * from bebida b where categoria=' + id + ' order by idbebida')
    request.query('select * from bebida b where categoria=' + id + ' order by idbebida', function(err, recordset) {
        if (err) callback(err, err)
        else callback(null, recordset)
        console.log(recordset)
    })
}

Camarero.obtenerBebidasMesa = function(id, callback) {
    request.query('select bm.idbebida,b.nombre as nombre , bm.cantidad from bebida_mesa bm, bebida b where bm.idbebida=b.idbebida and bm.idmesa=' + id, function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}


Camarero.obtenerPlatos = function(callback) {
    request.query('select * from plato order by nombre', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerCategoriasPlatos = function(callback) {
    request.query('select * from categoria_plato order by nombre_categoria', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerPlatosCategorias = function(id, callback) {
    request.query('select * from plato where categoria=' + id + ' order by nombre', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.pedirPlato = function(id, plato, callback) {
    request.query('select bm.idplato,b.nombre as nombre , bm.cantidad,bm.estado from plato_mesa bm, plato b where bm.idplato=b.idplato and bm.idmesa=' + id, function(err, recordset) {
        if (err) callback(err, false)
        else if (recordset[0].estado == null)
            request.query('update plato_mesa set estado = 0 where idmesa=' + id + ' and idplato=' + plato, function(err, recordset) {
                if (err) callback(err, false)
                else callback(null, recordset)
            })
        else
            request.query('update plato_mesa set estado = estado XOR 1 where idmesa=' + id + ' and idplato=' + plato, function(err, recordset) {
                if (err) callback(err, false)
                else callback(null, recordset)
            })
    })
}
Camarero.obtenerPlatosMesa = function(id, callback) {
    request.query('select bm.idplato,b.nombre as nombre , bm.cantidad,bm.estado from plato_mesa bm, plato b where bm.idplato=b.idplato and bm.idmesa=' + id, function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerMesas = function(callback) {
    request.query('select * from mesa ', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerMesasEstado = function(estado, callback) {
    request.query('select referencia from mesa where estado=' + estado + ' order by estado desc', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.obtenerTotalDineroMesa = function(id, callback) {
    request.query('select totalmesa(' + id + ') as total_mesa', function(err, recordset) {
        // console.log(recordset[0].total_mesa)
        if (err) callback(err, false)
        else callback(null, recordset)
    })
}

Camarero.abrirMesa = function(nombre, callback) {
    request.query('update mesa set estado = 1 where idmesa= ' + nombre, function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, true)
    });
}
Camarero.cambiarEstadoMesa = function(nombre, callback) {
    console.log('update mesa set estado = estado XOR 1  where idmesa= ' + nombre)
    request.query('update mesa set estado = estado XOR 1  where idmesa= ' + nombre, function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, true)
    });
}

Camarero.addPagoMesa = function(id, tipo, cantidad, callback) {
    console.log('insert into mesa_turno(idmesa,tipopago,cantidad) values(' + id + ',"' + tipo + '","' + cantidad + '")')
    request.query('insert into mesa_turno(idmesa,tipopago,cantidad) values(' + id + ',"' + tipo + '","' + cantidad + '")', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, true)
    });
}

Camarero.cerrarMesa = function(nombre, callback) {
    request.query('delete from bebida_mesa where idmesa=' + nombre, function(err, recordset) {
        if (err) callback(err, false)
        else {
            request.query('delete from plato_mesa where idmesa=' + nombre, function(err, recordset) {
                if (err) callback(err, false)
                else callback(null, true)
            })
        }
    });
}


module.exports = Camarero