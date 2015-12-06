/**
 * Created by Zeo on 11/27/15.
 */
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');


router.get('/allusers', function(req, res){


        User.find({}, function(err, data){
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