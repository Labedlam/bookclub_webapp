/**
 * Created by Zeo on 11/27/15.
 */
var express =require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');

var register = require('./routes/register');
var user = require('./routes/user');
var data = require('./routes/data');
var index=require('./routes/index');


//App Set//
app.set("port", process.env.PORT || 5001);

//App Middleware//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

        //Passport Session Configuration//
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//App Routes//
app.use('/register', register);
app.use('/user', user);
app.use('/data', data);
app.use('/', index);

//Mongo Connection//
var mongoURI = "mongodb://localhost:27017/book_town";
var mongoDB= mongoose.connect(mongoURI).connection;



mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(err){
    if(err) console.log("MONGO ERROR:", err);
});



//Check if listening//
app.listen(app.get("port"), function(){
    console.log("Listening on port:", app.get("port"));

});