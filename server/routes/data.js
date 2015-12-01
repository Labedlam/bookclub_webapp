/**
 * Created by Zeo on 11/27/15.
 */
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Schema=mongoose.Schema;


//Mongo Connection//
var mongoURI = "mongodb://localhost:27017/book_town";
var mongoDB= mongoose.connect(mongoURI).connection;
mongoose.model('BookClub', new Schema({"bookclub_name": String, "bookclub_members":Array}, {collection: 'clubs'}));
var BookClub = mongoose.model('BookClub');


mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(err){
    if(err) console.log("MONGO ERROR:", err);
});



//var people = require('../public/data/people');

router.get('/', function(req, res){
    //res.send(people);
    //console.log(people);



        BookClub.find({}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });




});

module.exports = router;