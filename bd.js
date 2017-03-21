var http = require("http");
var url = require("url");
var express = require('express'),
    cors = require('cors');
var app = express();
var config = {
    user: 'root',
    password: 'root',
    server: '127.0.0.1',
    database: 'ALERTAS_TEST'
};

/*var config = {
    user: 'vvrguvizleixrr',
    password: '8b96cc5036b5c9670d3a6b9a73f16b0e8de39d28907d1bf168d741c3f691e9a2',
    server: 'ec2-176-34-186-178.eu-west-1.compute.amazonaws.com',
    database: 'd5eas1d1slvfm1'
};*/

function configuracionBD() { return config; }
// module.exports=configuracionBD;
exports.config = config;
/*function obtenerTodo(){
 
app.use(cors());

app.get('/obtenerTo', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
   

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Alertas ', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });

 
});
}
exports.obtenerTodo=obtenerTodo;*/