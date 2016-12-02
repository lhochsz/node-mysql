/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//load customers route
var customers = require('./routes/customers'); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'superlux',
        port : 3000, //port mysql
        database:'leslie'
    },'request')
);//route index, hello world
app.get('/', routes.index);//route customer list
app.get('/customers', customers.list);//route add customer, get n post
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);//route delete customer
app.get('/customers/delete/:id', customers.delete_customer);//edit customer route , get n post
app.get('/customers/edit/:id', customers.edit); 
app.post('/customers/edit/:id',customers.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});