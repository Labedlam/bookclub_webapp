/**
 * Created by Zeo on 11/27/15.
 */
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Schema=mongoose.Schema;


//Get bookclub data
mongoose.model('BookClub', new Schema({"bookclub_name": String, "bookclub_members":Array}, {collection: 'clubs'}));
var BookClub = mongoose.model('BookClub');

router.get('/', function(req, res){


        BookClub.find({}, function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });

});

module.exports = router;

//var people = require('../public/data/people');
//res.send(people);
//console.log(people);