var dateformat = require('dateformat')

function obtenerDateTime() {
    return dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss ');
}
var usuariosON = [];
//exports.usuariosON = usuariosON
function buscarValorporID(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            // return array[i]; 
            return true
        }
    }
    return false
}

function isUserExistLogueado(n) {
    if (!buscarValorporID(usuariosON, 'idusuario', n.toString())) { return false; } else { return true; }
}

function estadoLogueo(req, res, next) {
    if (logueo == null || logueo === 'undefined') return false
    else if (logueo) return true
    else return false
}

function comprobarUser(recordset) {
    console.log(recordset.length)
    if (recordset.length == 0) {
        console.log('No hay nadie registrado con esas credenciales')
        logueo = false
        return false;
    } else {
        var n = recordset[0].id.toString()
        if (isUserExistLogueado(n)) {
            // console.log(quinesestanactualmenteactivosenelsistema)
            console.log('Ya estabas registrado')
            logueo = true
            return true
        } else {
            if (recordset.length == 1) {
                // console.log(quinesestanactualmenteactivosenelsistema.indexOf(n))
                logueo = true
                return true
            } else {
                console.log('No hay nadie registrado con esas credenciales');
                logueo = false;
                return false;
            }
        }
    }
}

function actualizarValorporID(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['idusuario'] == key) {
            array[i]['ipUsuario'] = value

            return true
        } else { return false; }
    }
}

function obtenerValorporTag(array, key) {
    for (var i = 0; i < array.length; i++) {
        return array[i][key]
            // return array[i]; 

    }
}

function obtenerValorporID(array, id, key) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['idusuario'] == id)
            return array[i][key]
                // return array[i]; 

    }
}

function returnIDNOTIFICACION(valoresaconvertir) {
    var str = new Buffer(100)
    return str.write(valoresaconvertir + valoresaconvertir.length, 'utf8')
}

function REGSYSUSER(recordset, ip) {
    usuariosON.push({ idusuario: recordset[0].id.toString(), nombreUsuario: recordset[0].Usuario.toString(), ipUsuario: ip, idGrupo: recordset[0].grupo.toString() })
    console.log(usuariosON)
}

function constuirObjetoEmit(p1, p2) {
    return {
        ID: returnIDNOTIFICACION(p1 + p2),
        titulo: p1.toString(),
        texto: p2.toString()
    }
}

function emitirAviso(idUsuario, orden, texto) {
    modelo_usuario.listaGrupoIDUsuarioID(idUsuario, function(err, data) {
        for (ele in data) {
            console.log(orden.toString() + "-" + orden);
            io.sockets.to(data[ele].idGrupo).emit(orden.toString(), texto);
        }
    });
}

exports.buscarValorporID = buscarValorporID
exports.isUserExistLogueado = isUserExistLogueado
exports.estadoLogueo = estadoLogueo
exports.comprobarUser = comprobarUser
exports.actualizarValorporID = actualizarValorporID
exports.obtenerValorporTag = obtenerValorporTag
exports.returnIDNOTIFICACION = returnIDNOTIFICACION
exports.REGSYSUSER = REGSYSUSER
exports.constuirObjetoEmit = constuirObjetoEmit
exports.emitirAviso = emitirAviso
exports.obtenerValorporID = obtenerValorporID
exports.obtenerDateTime = obtenerDateTime