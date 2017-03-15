var sql = require('mysql')
var configBD = require('../bd')
var Admin = {}
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
    //console.log('Admin connected as id ' + conn.threadId);
});


var request = conn

Admin.addCategoria = function(nombre, callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}
Admin.getCategoria = function(callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('select * from categoria_bebida', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}
Admin.deleteCategoria = function(nombre, callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('delete from categoria_bebida where idcategoria_bebida=' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.insertarBebida = function(nombre, precio, categoria, callback) {
    //console.log('Insert into bebida(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')');
    request.query('Insert into bebida(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.cambiarCategoriaBebida = function(nombre, categoria, callback) {
    //console.log('update bebida set precio = "'+precio+'" XOR 1 where referencia like "' + nombre + '"')
    request.query('update bebida set categoria = ' + categoria + ' where idbebida= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.cambiarPrecioBebida = function(nombre, precio, callback) {
    //console.log('update bebida set precio = "' + precio + '" where idbebida= ' + nombre)
    request.query('update bebida set precio = "' + precio + '" where idbebida= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.borrarBebida = function(nombre, callback) {
    request.query('delete from bebida where where idbebida= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.insertarMesa = function(nombre, callback) {
    request.query('Insert into mesa(referencia) values("' + nombre + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.insertarMesaPax = function(nombre, pax, callback) {
    request.query('Insert into mesa(referencia, pax) values("' + nombre + '",' + pax + ')', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.cambiarEstadoMesa = function(nombre, callback) {
    //console.log('update mesa set estado = estado XOR 1 where where idmesa= ' + nombre)
    request.query('update mesa set estado = estado XOR 1 where where idmesa= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.borrarMesa = function(nombre, callback) {
    request.query('delete from mesa where where idmesa= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.addPersonal = function(nombre, zona, cargo, callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.addZonaPersonal = function(nombre, callback) {
    //console.log('insert into categoria_zona(nombre) values("' + nombre + '")')
    request.query('insert into categoria_zona(nombre) values("' + nombre + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.deleteZonaPersonal = function(id, callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('delete from categoria_zona where idcategoria_zona=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.obtenerZonas = function(callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select * from categoria_zona', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalActivo = function(callback) {
    console.log('select * from personal p where p.idpersonal  in (select idpersonal from personal_turnos pt)')
    request.query('select * from personal p where p.idpersonal  in (select idpersonal from personal_turnos pt)', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalParado = function(callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select * from personal p where p.idpersonal not in (select idpersonal from personal_turnos pt)', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonal = function(callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select * from personal', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalHoras = function(id, callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select *,sum(horas) as total from personal_horas ph, personal p where ph.idpersonal=p.idpersonal and p.idpersonal=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalActivoNombreZona = function(callback) {
    //console.log('select * from personal p where p.idpersonal  in (select idpersonal from personal_turnos pt)')
    request.query('select * from personal p,categoria_zona cz where p.Zona=cz.idcategoria_zona  and p.idpersonal in (select idpersonal from personal_turnos pt)', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalParadoNombreZona = function(callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select * from personal p,categoria_zona cz where p.Zona=cz.idcategoria_zona  and p.idpersonal not in (select idpersonal from personal_turnos pt)', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalNombreZona = function(callback) {
    //console.log('insert into personal(nombre, zona, cargo) values("' + nombre + '","' + zona + '","' + cargo + '")')
    request.query('select * from personal p,categoria_zona cz where p.Zona=cz.idcategoria_zona ', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}

Admin.obtenerPersonalZona = function(id, callback) {
    request.query('select * from personal where zona=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}
Admin.obtenerPersonalZonaActivo = function(id, callback) {
    request.query('select * from personal p,categoria_zona cz where p.Zona=cz.idcategoria_zona   and p.idpersonal not in (select idpersonal from personal_turnos pt)and p.Zona=' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    })
}
Admin.obtenerPersonalZonaParado = function(id, callback) {
        request.query('select * from personal p,categoria_zona cz where p.Zona=cz.idcategoria_zona   and p.idpersonal  in (select idpersonal from personal_turnos pt)and p.Zona=' + id, function(err, recordset) {
            if (err) callback(err)
            else callback(null, recordset)
        })
    }
    /*Admin.cambiarPersonal = function(id, callback) {
        //console.log('insert into personal_turnos(idpersonal, fecha_entrada, estado) values(' + id + ',' + fecha + ',1)')
        request.query('insert into personal_turnos(idpersonal, fecha_entrada, estado) values(' + id + ',' + fecha + ',1)', function(err, recordset) {
            if (err) callback(err)
            else callback(null, true)
        });
    }*/

Admin.deletePersonal = function(id, callback) {
    //console.log('delete personal where idpersonal =' + id)
    request.query('delete personal where idpersonal =' + id, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}
Admin.entrarPersonal = function(id, callback) {
    //console.log('insert into personal_turnos(idpersonal, fecha_entrada, estado) values(' + id + ',"' + utilidades.obtenerDateTime() + '",1)')
    request.query('insert into personal_turnos(idpersonal, fecha_entrada, estado) values(' + id + ',"' + utilidades.obtenerDateTime() + '",1)', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.sacarPersonal = function(id, callback) {
    console.log('update personal_turnos set estado=0 , fecha_salida="' + utilidades.obtenerDateTime() + '" where idpersonal=' + id + ' and estado=1')
    request.query('update personal_turnos set estado=0 , fecha_salida="' + utilidades.obtenerDateTime() + '" where idpersonal=' + id + ' and estado=1', function(err, recordset) {
        if (err) callback(err)
        else {
            console.log(' insert into personal_horas(idpersonal, dia_mes,horaS) values(' + id + ',(select concat(fecha_entrada,"<>",fecha_salida) from personal_turnos where idpersonal=' + id + '), (select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))	from personal_turnos where idpersonal=' + id + '))')
            request.query(' insert into personal_horas(idpersonal, dia_mes,horaS) values(' + id + ',(select concat(fecha_entrada,"<>",fecha_salida) from personal_turnos where idpersonal=' + id + '), (select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))	from personal_turnos where idpersonal=' + id + '))', function(err, recordset) {
                if (err) callback(err)
                else {
                    console.log('delete from personal_turnos where idpersonal=' + id)
                    request.query('delete from personal_turnos where idpersonal=' + id, function(err, recordset) {
                        if (err) callback(err)
                        else callback(null, true)
                    });
                }
            });
        }
    });
    /*
        //console.log(' insert into personal_horas(idpersonal, dia_mes,horaS) values(' + id + ',(select concat(fecha_entrada,"<>",fecha_salida) from personal_turnos where idpersonal=' + id + '), (select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))	from personal_turnos where idpersonal=' + id + '))')
        request.query(' insert into personal_horas(idpersonal, dia_mes,horaS) values(' + id + ',(select concat(fecha_entrada,"<>",fecha_salida) from personal_turnos where idpersonal=' + id + '), (select  sum(TIMESTAMPDIFF(HOUR,personal_turnos.fecha_entrada, personal_turnos.fecha_salida))	from personal_turnos where idpersonal=' + id + '))', function(err, recordset) {
            if (err) callback(err)
                //else callback(null, true)
        });

        //console.log('delete from personal_turnos where idpersonal=' + id)
        request.query('delete from personal_turnos where idpersonal=' + id, function(err, recordset) {
            if (err) callback(err)
            else callback(null, true)
        });*/
}


module.exports = Admin