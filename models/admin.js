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

Admin.addCategoriaBebida = function(nombre, callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}
Admin.getCategoriaBebida = function(callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('select * from categoria_bebida order by nombre_categoria', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}
Admin.deleteCategoriaBebida = function(nombre, callback) {
    //console.log('Insert into categoria_bebida(nombre_categoria) values("' + nombre + '")')
    request.query('delete from categoria_bebida where idcategoria_bebida=' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.addBebida = function(nombre, precio, categoria, callback) {
    //console.log('Insert into bebida(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')');
    request.query('Insert into bebida(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}
Admin.updateBebida = function(nombre, precio, categoria, callback) {
    console.log('update bebida set categoria=' + categoria + ', precio="' + precio + '"where idbebida=' + nombre);
    request.query('update bebida set categoria=' + categoria + ', precio="' + precio + '"where idbebida=' + nombre, function(err, recordset) {
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


Admin.addCategoriaPlato = function(nombre, callback) {
    //console.log('Insert into categoria_plato(nombre_categoria) values("' + nombre + '")')
    request.query('Insert into categoria_plato(nombre_categoria) values("' + nombre + '")', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}
Admin.getCategoriaPlato = function(callback) {
    //console.log('Insert into categoria_plato(nombre_categoria) values("' + nombre + '")')
    request.query('select * from categoria_plato order by nombre_categoria', function(err, recordset) {
        if (err) callback(err)
        else callback(null, recordset)
    });
}
Admin.deleteCategoriaPlato = function(nombre, callback) {
    //console.log('Insert into categoria_plato(nombre_categoria) values("' + nombre + '")')
    request.query('delete from categoria_plato where idcategoria_plato=' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.insertarPlato = function(nombre, precio, categoria, callback) {
    //console.log('Insert into plato(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')');
    request.query('Insert into plato(nombre, precio,categoria) values("' + nombre + '","' + precio + '",' + categoria + ')', function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.cambiarCategoriaPlato = function(nombre, categoria, callback) {
    //console.log('update plato set precio = "'+precio+'" XOR 1 where referencia like "' + nombre + '"')
    request.query('update plato set categoria = ' + categoria + ' where idplato= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.cambiarPrecioPlato = function(nombre, precio, callback) {
    //console.log('update plato set precio = "' + precio + '" where idplato= ' + nombre)
    request.query('update plato set precio = "' + precio + '" where idplato= ' + nombre, function(err, recordset) {
        if (err) callback(err)
        else callback(null, true)
    });
}

Admin.borrarPlato = function(nombre, callback) {
    request.query('delete from plato where where idplato= ' + nombre, function(err, recordset) {
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

Admin.obtenerMesaPagos = function(callback) {
    request.query('SELECT *, sum(cantidad) as total,mt.idmesa as total_turno FROM mesa_turno mt, mesa m where mt.idmesa= m.idmesa group by mt.idmesa;', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    });
}

Admin.obtenerMesasAbiertas = function(callback) {
    request.query('SELECT count(*) as total FROM mesa where estado=1', function(err, recordset) {
        if (err) callback(err, false)
        else callback(null, recordset)
    });
}

Admin.cerrarTurno = function(callback) {
    request.query('truncate mesa_turno', function(err, recordset) {
        if (err) callback(err, false)
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
    request.query('select * from categoria_zona order by nombre_zona', function(err, recordset) {
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
    request.query('select * from personal order by Nombre', function(err, recordset) {
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