var fs = require('fs')

var path = require('path');
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
    //var nodemailer = require('nodemailer')
    //var email_sender = nodemailer.createTransport('smtps://jsm.multimedia%40gmail.com:BlackWater@smtp.gmail.com')

var utilidades = require('./funciones_extras')
var cors = require('cors')
app.use(cors())

var date = new Date()
var EventEmitter = require('events').EventEmitter
var eventExample = new EventEmitter
app.use(express.static(path.join(__dirname, 'public')));
// Create our Express router
var router = express.Router()
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

var modelo_camarero = require('./models/camarero')

// instanciamos router
var adminRouter = require('./router/adminRouter')

var bebidasRouter = require('./router/bebidasRouter')
var platosRouter = require('./router/platosRouter')
var camarerosRouter = require('./router/camarerosRouter')
var adminUsersRouter = require('./router/admin/adminUsersRouter')

var ipRoot = []
    //app.use('/admin', adminRouter)
    //app.use('/admin/users', adminUsersRouter)
    // aplicamos las rutas a nuestra aplicación, app
app.use('/admin', adminRouter)
app.use('/camarero', camarerosRouter)
app.use('/bebida', bebidasRouter)
app.use('/plato', platosRouter)

app.get('/root', function(req, res) {
    app._router.stack.forEach(function(r) {
        if (r.route && r.route.path)
            console.log(r.route.path)

    })
    expressListRoutes({ prefix: '/admin' }, 'adminRouter:', adminRouter);
    expressListRoutes({ prefix: '/admin/users' }, 'adminUsersRouter:', adminUsersRouter);
    expressListRoutes({ prefix: '/bebida' }, 'bebidasRouter:', bebidasRouter);
    expressListRoutes({ prefix: '/plato' }, 'platosRouter:', platosRouter);
    expressListRoutes({ prefix: '/camarero' }, 'camarerosRouter:', camarerosRouter);
    res.send(true)
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
app.get('/obtenerPlatos', function(req, res) {
    modelo_camarero.obtenerPlatos(function(err, data) { res.send(data) })
})

app.get('/obtenerCategoriasPlatos', function(req, res) {
    modelo_camarero.obtenerCategoriasPlatos(function(err, data) { res.send(data) })
})

app.get('/obtenerPlatosCategorias/:id', function(req, res) {
    modelo_camarero.obtenerPlatosCategorias(req.params.id, function(err, data) { res.send(data) })
})

app.get('/obtenerPlatosMesa/:id', function(req, res) {
    modelo_camarero.obtenerPlatosMesa(req.params.id, function(err, data) { res.send(data) })
})
app.get('/obtenerTotalDineroMesa/:id', function(req, res) {
    modelo_camarero.obtenerTotalDineroMesa(req.params.id, function(err, data) {
        res.send(data)
    })
})

app.get('/obtenerMesas', function(req, res) {
    modelo_camarero.obtenerMesas(function(err, data) { res.send(data) })
})

app.get('/obtenerMesasEstado/:estado', function(req, res) {
    modelo_camarero.obtenerMesasEstado(req.params.estado, function(err, data) { res.send(data) })
})

var printer = require("printer"),
    util = require('util');
app.get('/printerdefault', function(req, res) {
    console.log('default printer name: ' + (printer.getDefaultPrinterName() || 'is not defined on your computer'));
    console.log("supported formats are:\n" + util.inspect(printer.getSupportedPrintFormats(), { colors: true, depth: 10 }));
    console.log("supported job commands:\n" + util.inspect(printer.getSupportedJobCommands(), { colors: true, depth: 10 }));

    //console.log("installed printers:\n" + util.inspect(printer.getPrinters(), { colors: true, depth: 10 }));
    res.send(true)
})
app.get('/printerdriver', function(req, res) {
    printers = printer.getPrinters();

    printers.forEach(function(iPrinter, i) {
        console.log('' + i + 'ppd for printer "' + iPrinter.name + '":' + util.inspect(printer.getPrinterDriverOptions(iPrinter.name), { colors: true, depth: 10 }));
        console.log('\tselected page size:' + printer.getSelectedPaperSize(iPrinter.name) + '\n');
    });
})
app.get('/print', function(res, res) {
    printer.printDirect({
        data: "print from Node.JS buffer" // or simple String: "some text"
            //, printer:'Foxit Reader PDF Printer' // printer name, if missing then will print to default printer
            ,
        printer: printer.getDefaultPrinterName(),
        type: 'TEXT' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            ,
        success: function(jobID) {
            console.log("sent to printer with ID: " + jobID);
        },
        error: function(err) { console.log(err); }
    });
})

app.get('/printers', function(req, res) {
        //console.log('default printer name: ' + (printer.getDefaultPrinterName() || 'is not defined on your computer'));
        console.log("installed printers:\n" + util.inspect(printer.getPrinters(), { colors: true, depth: 10 }));
        res.send(true)
    })
    /*
    var escpos = require('escposify');
    var device = new escpos.USB();
    var printer = new escpos.Printer(device);*/
var ipp = require('ipp');
var printer2 = ipp.Printer("http://192.168.1.38:631/ipp/printer");
/*var mdns = require('mdns'),
    browser = mdns.createBrowser(mdns.tcp('ipp'));

browser.on('serviceUp', function(rec) {
    console.log(rec.name, 'http://' + rec.host + ':' + rec.port + '/' + rec.txtRecord.rp);
});
browser.start();*/

app.get('/IdentifyPrinter', function(req, res) {
    var msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "William",
            "message": "These are not the droids you are looking for"
        }
    };

    printer2.execute("Identify-Printer", msg, function(err, res) {
        console.log(res);
    });
})

app.get('/printURI', function(req, res) {
    var msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "William",
            "job-name": "My Test Job",
            "document-format": "application/text",
            "document-uri": "./plantilla.js"
        }
    };
    printer2.execute("Print-URI", msg, function(err, res) {
        console.log(res);
    });
})

//doc.table(products, tableOptions);
var jsreport = require('jsreport');

var buffers = [];
app.get('/printDoc', function(req, res) {
    var printer = ipp.Printer("http://gorka-notebook.local.:631/printers/MFC-L2700D-2");

    jsreport.render({
        template: {
            content: '<b>Hello world</b><img style="margin-left: 35%" src="http://' + host + ':' + port + '/images/llorer.png" />',
            engine: 'jsrender',
            recipe: 'phantom-pdf',
            phantom: {
                header: "<p style='text-align:center'>Ticket de mesa</p>",
                orientation: "portrait",
                width: "300px"
            }
        }
    }).then(function(out) {
        out.stream.pipe(res);
        console.log(out.content)
        console.log("out.content")
        buffers = out.content
        console.log(buffers)
        var file = {
            "operation-attributes-tag": {
                "requesting-user-name": "User",
                "job-name": "Print Job",
                "document-format": "application/pdf"
            },
            data: Buffer.concat([buffers])
        };
        console.log("data" + file.data)

        //console.log(data)
        /*printer.execute("Print-Job", file, function(err, res) {
            console.log("Printed: " + res.statusCode);
        });*/
    }).catch(function(e) {
        res.end(e.message);
    });



    /*doc.on('data', buffers.push.bind(buffers));
    doc.on('end', function() {
        var printer = ipp.Printer("http://gorka-notebook.local.:631/printers/MFC-L2700D-2");
        var file = {
            "operation-attributes-tag": {
                "requesting-user-name": "User",
                "job-name": "Print Job",
                "document-format": "application/pdf"
            },
            data: Buffer.concat(buffers)
        };*/

    /*printer.execute("Print-Job", file, function(err, res) {
        console.log("Printed: " + res.statusCode);
    });*/

    //}); 
    //doc.write("salida-1.pdf");

    //doc.end();

})
app.get('/getJobs', function(req, res) {
        var msg = {
            "operation-attributes-tag": {
                //use these to view completed jobs...
                //			"limit": 10,
                //			"which-jobs": "completed"
            }
        }

        printer2.execute("Get-Jobs", msg, function(err, res) {
            console.log(res);
        });
    })
    /*
    var serialport = require('serialport');
    var SerialPort = serialport.SerialPort;

    // list serial ports:
    serialport.list(function(err, ports) {
        ports.forEach(function(port) {
            console.log(port.comName);
        });
    });
    var myPort = new SerialPort(portName, {
        baudRate: 9600,
        // look for return and newline at the end of each data packet:
        parser: serialport.parsers.readline("\n")
    });*/

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', host + ':' + port)

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