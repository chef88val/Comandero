var sql = require('mysql')
var configBD = require('../bd')
var Usuarios = {}
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
    console.log('Usuarios connected as id ' + conn.threadId);
});
var request = conn

// app.get('/obtenerUser/:id'
Usuarios.obtenerUserID = function(id, callback) {
    console.log()
    request.query("select * from Usuarios where  id=" + id, function(err, recordset) {
        // conn.end()

        if (err) callback(err)
        else callback(null, recordset)
    })
}


// app.put('/usuario/:id/:usuario/:email/:grupo/:rol/:password/:estudios'
Usuarios.modificarUsuario = function(id, usuario, email, grupo, rol, password, estudios, callback) {
    request.query("update Usuarios set Usuario='" + usuario + "',email='" + email + "',grupo='" + grupo +
        "',rol='" + rol + "',password='" + password + "', estudios ='" + estudios + "' where id=" + id,
        function(err, recordset) {
            // conn.end()
            if (err) callback('modificarAlerta' + err)
            else callback(null, true)

            // send records as a response
            //console.log('modificarAlerta' + true)
        })
}

// app.put('/usuario/:id/:usuario/:email/:grupo/:rol/:password/:estudios'
Usuarios.listadoUsuarios = function(id, callback) {
    request.query("select id,Usuario, rol from Usuarios ", function(err, recordset) {
        // conn.end()
        if (err) callback('modificarAlerta' + err)
        else callback(null, recordset)

        // send records as a response
        //console.log('modificarAlerta' + true)
    })
}

// app.post('/login/:id'
Usuarios.login = function(n, n2, n3, callback) {
    //console.log("select * from Usuarios where Usuario='" + n + "' and password='" + n2 + "'" + " and id='" + n3 + "'");
    request.query("select * from Usuarios where Usuario='" + n + "' and password='" + n2 + "'" + " and id='" + n3 + "'", function(err, recordset) {
        // conn.end()
        if (err) {
            callback(err);
            console.log('login' + false)
        } else {
            callback(null, recordset);
            console.log('login' + true)
        }

        // send records as a response

    })
}

// app.put('/usuario/:id/:usuario/:email/:grupo/:rol/:password/:estudios'
Usuarios.actualizarUsuarioRol = function(id, usuario, rol, callback) {
    request.query("update Usuarios set rol='" + rol + "'where id=" + usuario, function(err, recordset) {
        // conn.end()
        if (err) callback('actualizarUsuarioRol' + err)
        else callback(null, true)

        // send records as a response
        //console.log('modificarAlerta' + true)
    })
}

Usuarios.listaGrupoUsuario = function(id, callback) {
    request.query("select (select nombreGrupo from Grupo where idGrupo=" + id + ") as 'NombreGrupo' from Grupo_Usuario where idUsuario=" + id, function(err, recordset) {
        if (err) callback('listaGrupoUsuario' + err)
        else callback(null, recordset)
    });
}

Usuarios.listaGrupos = function(id, callback) {
    request.query("select nombreGrupo from Grupo", function(err, recordset) {
        if (err) callback('listaGrupoUsuario' + err)
        else callback(null, recordset)
    });
}
Usuarios.listaGrupoID = function(id, callback) {
    request.query("select nombreGrupo from Grupo where idGrupo=" + id, function(err, recordset) {
        if (err) callback('listaGrupoUsuario' + err)
        else callback(null, recordset)
    });
}

Usuarios.listaGrupoIDUsuarioID = function(id, callback) {
    request.query("SELECT (select nombreGrupo from Grupo where GU.idGrupo= Grupo.idGrupo) as 'Nombre_Grupo'" +
        "  FROM [ALERTAS_TEST].[dbo].[Grupo_Usuario] GU where GU.idUsuario=" + id,
        function(err, recordset) {
            if (err) callback('listaGrupoUsuario' + err)
            else callback(null, recordset)

            console.log(recordset)
        });
}
Usuarios.listaGrupoIDUsuario = function(id, callback) {
    request.query("select idGrupo from Grupo_Usuario where idUsuario=" + id, function(err, recordset) {
        if (err) callback('listaGrupoUsuario' + err)
        else callback(null, recordset)
    });
}
Usuarios.nuevousuariogrupo = function(idUsuario, idGrupo, valoraccion, callback) {
    if (valoraccion == "true") {
        request.query("select * from Grupo_Usuario where idUsuario=" + idUsuario + " and idGrupo=(select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "') ", function(err, recordset) {
            console.log(valoraccion + "-" + recordset.length);
            if (recordset.length == 0) {

                console.log("insertar" + valoraccion);
                console.log('insert into Grupo_Usuario (idUsuario, idGrupo)' +
                    " values (" + idUsuario + ", (select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "') )")
                request.query('insert into Grupo_Usuario (idUsuario, idGrupo)' +
                    " values (" + idUsuario + ", (select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "') )",
                    function(err, recordset) {
                        // conn.end()
                        if (err) callback('nuevousuariogrupo' + err)
                        else callback(null, true)
                    });
                // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  
            }
            // send records as a response
            //console.log('nuevaAlerta' + true)
        });
    } else {
        console.log("borrar" + valoraccion);
        request.query("select * from Grupo_Usuario where idUsuario=" + idUsuario + " and idGrupo=(select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "') ", function(err, recordset) {
            console.log(valoraccion + "-" + recordset.length);
            if (recordset.length == 1) {
                console.log("delete from Grupo_Usuario where idUsuario=" + idUsuario + " and idGrupo=(select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "')")
                request.query("delete from Grupo_Usuario where idUsuario=" + idUsuario + " and idGrupo=(select idGrupo from Grupo where nombreGrupo ='" + idGrupo + "')", function(err, recordset) {
                    // conn.end()
                    if (err) callback('nuevousuariogrupo' + err)
                    else callback(null, true)
                        // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

                    // send records as a response
                    //console.log('nuevaAlerta' + true)
                });
            }
        });

    }
    /* request.query("select * from Grupo_Usuario where idUsuario="+idUsuario+" and idGrupo=(select idGrupo from Grupo where nombreGrupo ='"+idGrupo+"') ",function(err,recordset){
      console.log(recordset.length);
       if(recordset.length!=0){ console.log("Hay registros previos");
      callback(null,true);
       }else{console.log("No hay registros previos");}
         console.log('insert into Grupo_Usuario (idUsuario, idGrupo)' +
       " values (" + idUsuario + ", (select idGrupo from Grupo where nombreGrupo ='"+idGrupo+"') )")
     
     })*/
    //request.query('delete from Grupo_Usuario'); 
    /*request.query('insert into Grupo_Usuario (idUsuario, idGrupo)' +
      " values (" + idUsuario + ", (select idGrupo from Grupo where nombreGrupo ='"+idGrupo+"') )", function (err, recordset) {
        // conn.end()
        if (err) callback('nuevousuariogrupo' + err)
        else callback(null, true)
        // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

        // send records as a response
        //console.log('nuevaAlerta' + true)
      })*/
}

Usuarios.nuevousuariogrupoID = function(idUsuario, idGrupo, callback) {
    request.query('insert into Grupo_Usuario (idUsuario, idGrupo)' +
        " values (" + idUsuario + ", " + idGrupo + ")",
        function(err, recordset) {
            // conn.end()
            if (err) callback('nuevousuariogrupo' + err, false)
            else callback(null, true)
                // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

            // send records as a response
            //console.log('nuevaAlerta' + true)
        })
}

Usuarios.nombreUsuario = function(idUsuario, callback) {
        request.query("Select Usuario from Usuarios where id=" + idUsuario, function(err, recordset) {
            // conn.end()
            if (err) callback('nuevousuariogrupo' + err, false)
            else callback(null, recordset)
                // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

            // send records as a response
            //console.log('nuevaAlerta' + true)
        })
    }
    // app.put('/nuevoperfil/:idusuario/:nombreusuario/:email/:estudios/:password/:rol'
Usuarios.nuevoUsuario = function(nombreusuario, email, estudios, password, rol, callback) {
    request.query('insert into Usuarios (Usuario,email,estudios,password,rol,grupo)' +
        " values ('" + nombreusuario + "','" + email +
        "','" + estudios + "','" + password + "','" + rol + "','')",
        function(err, recordset) {
            // conn.end()
            if (err) callback('nuevaAlerta' + err)
            else callback(null, true)

            // io.emit('newalerta', {texto:"El usuario "+req.params.idusuario+" ha creado una nueva alerta"})  

            // send records as a response

        })
}

module.exports = Usuarios