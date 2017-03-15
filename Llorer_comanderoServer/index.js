var fs = require('fs')
    //var path = require('path')
    //var gcm = require('node-gcm')

var express = require('express')
var expressListRoutes = require('express-list-routes');
var app = express()
var http = require('http')
var server = http.createServer(app)
    // var router = require("./router")
    //var sql = require('mssql')
    //var cors = require('cors')
var btoa = require('btoa')
var atob = require('atob')
var ip = require('ip')
var dateFormat = require('dateformat')
var nodemailer = require('nodemailer')
var utilidades = require('./funciones_extras')
var cors = require('cors')
app.use(cors())

var date = new Date()
var EventEmitter = require('events').EventEmitter
var eventExample = new EventEmitter

// Create our Express router
var router = express.Router()
var email_sender = nodemailer.createTransport('smtps://jsm.multimedia%40gmail.com:BlackWater@smtp.gmail.com')
var host = ip.address()
var port = 5000
server.listen(port, host, function() {
    console.log('running at http://' + host + ':' + port)
    console.log('Server is running.')
})

var mailData = {
    from: 'jsm.multimedia@gmail.com',
    to: 'javier.segarra@didautomation.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<b>Hello world ?</b>'
}

var modelo_alertas = require('./models/alertas')
var modelo_usuario = require('./models/usuarios')
var modelo_comentarios = require('./models/comentarios')
var modelo_chat = require('./models/chat')
var modelo_camarero = require('./models/camarero')

// instanciamos router
var adminRouter = require('./router/adminRouter')

var bebidasRouter = require('./router/bebidasRouter')
var camarerosRouter = require('./router/camarerosRouter')

var ipRoot = []
app.use('/admin', adminRouter)

// aplicamos las rutas a nuestra aplicación, app
app.use('/admin', adminRouter)
app.use('/camarero', camarerosRouter)
app.use('/bebida', bebidasRouter)

app.get('/root', function(req, res) {
    app._router.stack.forEach(function(r) {
        if (r.route && r.route.path)
            console.log(r.route.path)

    })
    expressListRoutes({ prefix: '/admin' }, 'adminRouter:', adminRouter);
    expressListRoutes({ prefix: '/bebida' }, 'bebidasRouter:', bebidasRouter);
    expressListRoutes({ prefix: '/camarero' }, 'camarerosRouter:', camarerosRouter);
})

app.get('/obtenerConexion', function(req, res) {
    res.send(true)
})
app.get('/obtenerBebidas', function(req, res) {
    modelo_camarero.obtenerBebidas(function(err, data) { res.send(data) })
})

app.get('/obtenerCategoriasBebidas', function(req, res) {
    modelo_camarero.obtenerCategoriasBebidas(function(err, data) { res.send(data) })
})

app.get('/obtenerBebidasCategorias/:id', function(req, res) {
    modelo_camarero.obtenerBebidasCategorias(req.params.id, function(err, data) { res.send(data) })
})

app.get('/obtenerBebidasMesa/:id', function(req, res) {
    modelo_camarero.obtenerBebidasMesa(req.params.id, function(err, data) { res.send(data) })
})

app.get('/obtenerTotalDineroMesa/:id', function(req, res) {
    modelo_camarero.obtenerTotalDineroMesa(req.params.id, function(err, data) { res.send(data) })
})

app.get('/obtenerMesas', function(req, res) {
    modelo_camarero.obtenerMesas(function(err, data) { res.send(data) })
})

app.get('/obtenerMesasEstado/:estado', function(req, res) {
    modelo_camarero.obtenerMesasEstado(req.params.estado, function(err, data) { res.send(data) })
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', host + ':3000')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
})

/*  
passport.use(new Strategy(
  function(username, password, cb) {
 db.users.findByUsername(username, function(err, user) {
   if (err) { return cb(err); }
   if (!user) { return cb(null, false); }
   if (user.password != password) { return cb(null, false); }
   return cb(null, user)
 })
  }))

passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
 if (err) { return cb(err); }
 cb(null, user)
  })
})
*/