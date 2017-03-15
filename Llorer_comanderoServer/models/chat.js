var sql = require('mysql')
var configBD = require('../bd')
var Chat = {}
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
    console.log('Chat connected as id ' + conn.threadId);
});
var request = conn

Chat.obtenerTodoMensajes = function(id, callback) {
    request.query("select *,(select usuario from Usuarios where id=" + id + ")as Nombre_Usuario from Chat where usuario=" + id, function(err, recordset) {
        if (err) callback('obtenerTodoMensajes' + err)
        else callback(null, recordset)
    });
}
Chat.obtenerUserMensajes = function(id, callback) {
    request.query("select *,(select usuario from Usuarios where id=" + id + ")as Nombre_Usuario from Chat where leido=0 and usuario=" + id, function(err, recordset) {
        if (err) callback('obtenerUserMensajes' + err)
        else callback(null, recordset)
    });
}
Chat.nuevoMensaje = function(id, mensaje, room, callback) {
    request.query('insert into Chat (usuario,mensaje,room,leido,Creado) values' +
        '(' + id + ",'" + mensaje + "'," + room + ",0,'" + fecha + "')",
        function(err, recordset) {
            if (err) callback('nuevoMensaje' + err)
            else callback(null, true)
        });
}

module.exports = Chat