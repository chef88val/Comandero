var sql = require('mysql')
var configBD = require('../bd')
var Platos = {}
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
    console.log('Platos connected as id ' + conn.threadId);
});


var request = conn

Platos.insertarPlato = function(mesa, plato, cantidad, callback) { //,"' + plato + '"
    request.query('select count(*) as total from plato_mesa where idmesa=' + mesa + ' and idplato=' + plato, function(err, recordset) {
            //console.log(recordset[0].total)
            if (recordset[0].total >= 1) {
                console.log('update plato_mesa set cantidad=cantidad+' + cantidad + ' where idmesa=' + mesa + ' and idplato=' + plato)
                request.query('update plato_mesa set cantidad=cantidad+' + cantidad + ' where idmesa=' + mesa + ' and idplato=' + plato, function(err, recordset) {
                    if (err) callback(err)
                    else callback(null, true)
                });
            } else {
                request.query('Insert into plato_mesa(idmesa,idplato,cantidad) values(' + mesa + ',' + plato + ',' + cantidad + ')', function(err, recordset) {
                    if (err) callback(err)
                    else callback(null, true)
                });
            }
        })
        //console.log('Insert into plato_mesa(idmesa,idplato,cantidad) values(' + mesa + ',' + plato + ',' + cantidad + ')')

}

Platos.actualizarPlato = function(mesa, plato, cantidad, callback) { //,"' + plato + '"
    //console.log('update plato_mesa set cantidad = cantidad +' + cantidad + ' where idmesa =' + mesa + ' and idplato=' + plato)
    request.query('update plato_mesa set cantidad = cantidad+ ' + cantidad + ' where idmesa =' + mesa + ' and idplato=' + plato, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Platos.borrarPlato = function(mesa, plato, callback) {
    request.query('delete from plato_mesa where idmesa =' + mesa + '" and idplato=' + plato, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}


module.exports = Platos