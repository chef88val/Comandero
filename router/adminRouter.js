var express = require('express');
var modelo_admin = require('../models/admin')
var app = express()
var usersRouter = require('./admin/adminUsersRouter')
app.use('/users', usersRouter)
var router = express.Router();
router.get('/users', function(req, res) {
    console.log("/admin/users")
    app.use(usersRouter)
});
/*
//users page (http://localhost:1337/admin/users)
router.get('/users', function(req, res) {
    res.send('¡Muestro todos los usuarios!');
});
//ruta con parámetros (http://localhost:1337/admin/users/:name)
router.get('/users/:name', function(req, res) {
    res.send('hola ' + req.params.name + '!');
});*/
router.get('/adminLogin/:clave', function(req, res) {
    if (req.params.clave == "4444") { res.send("admin") } else if (req.params.clave == "5555") { res.send("root") } else if (req.params.clave != "5555" || (req.params.clave != "4444")) res.send("false")
})


router.get('/getCategoriaBebida/', function(req, res) {
    modelo_admin.getCategoriaBebida(function(err, data) {
        res.send(data);
    });
})

router.post('/addCategoriaBebida/:nombre', function(req, res) {
    modelo_admin.addCategoriaBebida(req.params.nombre, function(err, data) {
        res.send(data);
    });
})

router.post('/addBebida/:nombre/:precio/:categoria', function(req, res) {
    modelo_admin.insertarBebida(req.params.nombre, req.params.precio, req.params.categoria, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarCategoriaBebida/:nombre/:categoria', function(req, res) {
    modelo_admin.cambiarCategoriaBebida(req.params.nombre, req.params.categoria, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarPrecioBebida/:nombre/:precio', function(req, res) {
    modelo_admin.cambiarPrecioBebida(req.params.nombre, req.params.precio, function(err, data) {
        res.send(data);
    });
})

router.post('/deleteBebida/:nombre', function(req, res) {
    modelo_admin.borrarBebida(req.params.nombre, function(err, data) {
        res.send(data);
    });
})

router.get('/getCategoriaPlato/', function(req, res) {
    modelo_admin.getCategoriaPlato(function(err, data) {
        res.send(data);
    });
})

router.post('/addCategoriaPlato/:nombre', function(req, res) {
    modelo_admin.addCategoriaPlato(req.params.nombre, function(err, data) {
        res.send(data);
    });
})

router.post('/addPlato/:nombre/:precio/:categoria', function(req, res) {
    modelo_admin.insertarPlato(req.params.nombre, req.params.precio, req.params.categoria, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarCategoriaPlato/:nombre/:categoria', function(req, res) {
    modelo_admin.cambiarCategoriaPlato(req.params.nombre, req.params.categoria, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarPrecioPlato/:nombre/:precio', function(req, res) {
    modelo_admin.cambiarPrecioPlato(req.params.nombre, req.params.precio, function(err, data) {
        res.send(data);
    });
})

router.post('/deletePlato/:nombre', function(req, res) {
    modelo_admin.borrarPlato(req.params.nombre, function(err, data) {
        res.send(data);
    });
})

router.post('/addMesa/:mesa', function(req, res) {
    modelo_admin.insertarMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})

router.post('/addMesaPax/:mesa/:pax', function(req, res) {
    modelo_admin.insertarMesaPax(req.params.mesa, req.params.pax, function(err, data) {
        res.send(data);
    });
})

router.post('/deleteMesa/:mesa', function(req, res) {
    modelo_admin.borrarMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarEstadoMesa/:mesa', function(req, res) {
    modelo_admin.cambiarEstadoMesa(req.params.mesa, function(err, data) {
        res.send(data);
    });
})

router.post('/addPersonal/:nombre/:zona/:cargo', function(req, res) {
    modelo_admin.addPersonal(req.params.nombre, req.params.zona, req.params.cargo, function(err, data) {
        res.send(data);
    });
})

router.put('/cambiarPersonal/:id', function(req, res) {
    modelo_admin.cambiarPersonal(req.params.id, function(err, data) {
        res.send(data);
    });
})

router.post('/addZonaPersonal/:nombre', function(req, res) {
    modelo_admin.addZonaPersonal(req.params.nombre, function(err, data) {
        res.send(data);
    });
})

router.post('/deleteZonaPersonal/:id', function(req, res) {
    modelo_admin.deleteZonaPersonal(req.params.id, function(err, data) {
        res.send(data);
    });
})

router.get('/obtenerZonas', function(req, res) {
    modelo_admin.obtenerZonas(function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonal', function(req, res) {
    modelo_admin.obtenerPersonal(function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonalHoras/:id', function(req, res) {
    modelo_admin.obtenerPersonalHoras(req.params.id, function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonalActivo', function(req, res) {
    modelo_admin.obtenerPersonalActivo(function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonalParado', function(req, res) {
    modelo_admin.obtenerPersonalParado(function(err, data) {
        res.send(data);
    });
})

router.get('/obtenerPersonalNombreZona', function(req, res) {
    modelo_admin.obtenerPersonalNombreZona(function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonalActivoNombreZona', function(req, res) {
    modelo_admin.obtenerPersonalActivoNombreZona(function(err, data) {
        res.send(data);
    });
})
router.get('/obtenerPersonalParadoNombreZona', function(req, res) {
    modelo_admin.obtenerPersonalParadoNombreZona(function(err, data) {
        res.send(data);
    });
})

router.get('/obtenerPersonalZona/:id', function(req, res) {
    modelo_admin.obtenerPersonalZona(req.params.id, function(err, data) { res.send(data) })
})

router.get('/obtenerPersonalZonaActivo/:id', function(req, res) {
    modelo_admin.obtenerPersonalZonaActivo(req.params.id, function(err, data) { res.send(data) })
})
router.get('/obtenerPersonalZonaParado/:id', function(req, res) {
    modelo_admin.obtenerPersonalZonaParado(req.params.id, function(err, data) { res.send(data) })
})

router.post('/deletePersonal/:id', function(req, res) {
    modelo_admin.deletePersonal(req.params.id, function(err, data) {
        res.send(data);
    });
})

router.post('/entrarPersonal/:id', function(req, res) {
    modelo_admin.entrarPersonal(req.params.id, function(err, data) {
        res.send(data);
    });
})

router.put('/sacarPersonal/:id', function(req, res) {
    modelo_admin.sacarPersonal(req.params.id, function(err, data) {
        res.send(data);
    });
})
module.exports = router;