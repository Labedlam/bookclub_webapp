/**
 * Created by Zeo on 11/27/15.
 */
var express =require('express');
var app = express();
var bodyParser = require('body-parser');



var data = require('./routes/data');
var index=require('./routes/index');


//App Set//
app.set("port", process.env.PORT || 5000);

//App Middleware//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

//App Routes//
app.use('/data', data);
app.use('/', index);





//Check if listening//
app.listen(app.get("port"), function(){
    console.log("Listening on port:", app.get("port"));

});