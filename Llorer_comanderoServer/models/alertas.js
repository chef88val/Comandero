var sql = require('mysql')
var configBD = require('../bd')
var Alertas = {}
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
    console.log('Alertas connected as id ' + conn.threadId);
});


var request = conn

// app.get('/obtenerTodo'
Alertas.obtenerTodo = function(callback) {
    request.query('select * from Alertas', function(err, recordset) {
        // conn.end()
        if (err) callback(err)
        else callback(null, recordset)
        io_namespace.emit('login', { texto: 'obtenerTodo' })
    })
}


// app.get('/obtenerTodo/:id'
Alertas.obtenerTodoID = function(id, callback) {
    console.log()
    request.query("select * from Alertas where  Atendida is NULL or usuarioAtendida=" + id + " and estado !='cerrada'", function(err, recordset) {
        // conn.end()

        if (err) callback(err)
        else callback(null, recordset)
    })
}



// app.put('/newalerta/:idusuario/:nmaquina/:tituloalerta/:descripcionalerta/:taller'
Alertas.nuevaAlerta = function(idUsuario, nMaquina, tituloAlerta, descripcionAlerta, taller, callback) {

    request.query('insert into Alertas (Fecha,usuarioCreada,Id_Maquina,Descripcion,Nombre,taller,estado)' +
        " values ('" + fecha + "'," + idUsuario +
        ',' + nMaquina + ",'" + tituloAlerta + "','" + descripcionAlerta + "','" + taller + "','pendiente')",
        function(err, recordset) {
            // conn.end()
            if (err) callback('nuevaAlerta' + err)
            else request.query('insert into Comentarios (Fecha,idUsuario,idAlerta,Comentario)' +
                " values ('" + fecha + "'," + idUsuario +
                ',' + '(select top 1 Id_Alerta from  Alertas order by Id_Alerta desc )' + ",'" + 'Alerta Creada' + "')",
                function(err, recordset) {
                    callback(null, true)
                })

            // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

            // send records as a response

        })
}

// app.put('/alerta/:id/:acction/:acctionstatus/:dataacctionstatus/:timeacctionstatus/:usuario'
Alertas.modificarAlerta = function(id, accion, accionValor, /* dataValor, timeValor,*/ usuarioAlerta, callback) {

    request.query('update Alertas set ' + accion + '=' + accionValor + ',tiempo' + accion + "='" +
        fecha + "', usuario" + accion + "=" + usuarioAlerta + ",estado='" + accion + "' where Id_Alerta=" + id,
        function(err, recordset) {
            // conn.end()
            if (err) callback('nuevaAlerta' + err)
            else request.query('insert into Comentarios (Fecha,idUsuario,idAlerta,Comentario)' +
                " values ('" + fecha + "'," + usuarioAlerta +
                ',' + id + ",'" + 'Alerta' + accion + "')",
                function(err, recordset) {
                    callback(null, true)
                })

            // send records as a response
            //console.log('modificarAlerta' + true)
        })
}


Alertas.deleteAlerta = function(id, usuario, callback) {
    request.query("update Alertas set estado='cerrada',usuarioEliminada=" + usuario + " where Id_Alerta=" + id, function(err, recordset) {
        // conn.end()
        if (err) callback('eliminarAlerta' + err)
        else callback(null, true)

        // send records as a response
        console.log('eliminarAlerta' + true)
    })
}

module.exports = Alertas