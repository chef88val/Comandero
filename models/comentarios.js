var sql = require('mysql')
var configBD = require('../bd')
var Comentarios = {}
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
    console.log('Comentarios connected as id ' + conn.threadId);
});
var request = conn


// app.put('/newalerta/:idusuario/:nmaquina/:tituloalerta/:descripcionalerta/:taller'
Comentarios.nuevoComentario = function (idUsuario, alerta, texto, callback) {
  request.query('insert into Comentarios (Fecha,idUsuario,idAlerta,Comentario)' +
    " values ('" + fecha + "'," + idUsuario +
    ',' + alerta + ",'" + texto + "')", function (err, recordset) {
      // conn.end()
      if (err) callback('nuevoComentario' + err)
      else callback(null, true)
      // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

      // send records as a response
      //console.log('nuevaAlerta' + true)
    })
}
// app.put('/usuario/:id/:usuario/:email/:grupo/:rol/:password/:estudios'
Comentarios.listadoComentarios = function (id, callback) {
  request.query("select  C.id,C.idUsuario,(Select Usuario from Usuarios where id="+id+") as Nombre,C.idAlerta,C.comentario,C.Fecha "+
  "from Comentarios C where idAlerta="+id, function (err, recordset) {
      // conn.end()
      if (err) callback('modificarAlerta' + err)
      else callback(null, recordset)

      // send records as a response
      //console.log('modificarAlerta' + true)
    })
}


module.exports = Comentarios
