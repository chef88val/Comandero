var sql = require('mysql')
var configBD = require('../bd')
var Bebidas = {}
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
    console.log('Bebidas connected as id ' + conn.threadId);
});


var request = conn

Bebidas.insertarBebida = function(mesa, bebida, cantidad, callback) { //,"' + bebida + '"
    request.query('select count(*) as total from bebida_mesa where idmesa=' + mesa + ' and idbebida=' + bebida, function(err, recordset) {
            //console.log(recordset[0].total)
            if (recordset[0].total >= 1) {
                console.log('update bebida_mesa set cantidad=cantidad+' + cantidad + ' where idmesa=' + mesa + ' and idbebida=' + bebida)
                request.query('update bebida_mesa set cantidad=cantidad+' + cantidad + ' where idmesa=' + mesa + ' and idbebida=' + bebida, function(err, recordset) {
                    if (err) callback(err)
                    else callback(null, true)
                });
            } else {
                request.query('Insert into bebida_mesa(idmesa,idbebida,cantidad) values(' + mesa + ',' + bebida + ',' + cantidad + ')', function(err, recordset) {
                    if (err) callback(err)
                    else callback(null, true)
                });
            }
        })
        //console.log('Insert into bebida_mesa(idmesa,idbebida,cantidad) values(' + mesa + ',' + bebida + ',' + cantidad + ')')

}

Bebidas.actualizarBebida = function(mesa, bebida, cantidad, callback) { //,"' + bebida + '"
    //console.log('update bebida_mesa set cantidad = cantidad +' + cantidad + ' where idmesa =' + mesa + ' and idbebida=' + bebida)
    request.query('update bebida_mesa set cantidad = cantidad+ ' + cantidad + ' where idmesa =' + mesa + ' and idbebida=' + bebida, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Bebidas.borrarBebida = function(mesa, bebida, callback) {
    request.query('delete from bebida_mesa where idmesa =' + mesa + '" and idbebida=' + bebida, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}


module.exports = Bebidas