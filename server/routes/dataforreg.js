/**
 * Created by Zeo on 12/4/15.
 */
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var BookClub = require('../models/bookClub');

router.get('/', function(req, res){


    BookClub.find({}, function(err, data){
        if(err){
            console.log("ERROR! : ", err);
        }
        res.send(data);

    });

});



module.exports = router;