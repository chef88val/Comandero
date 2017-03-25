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



module.exports = Bebidas