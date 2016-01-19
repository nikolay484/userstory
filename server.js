var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


mongoose.connect(config.database, function(err) {
   if(err) {
       console.log(err);
   } else {
        console.log("connected to MongoDB");   
   } 
});
app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);
app.use('/dev/userStory/api', api);

app.get('*', function(req, res) {
   res.sendFile(__dirname + '/public/app/views/index.html');
});
http.listen(config.port , function(err) {
   if(err) {
       console.log(err);
   } else {
        console.log("listening on port 3000");   
   }
});