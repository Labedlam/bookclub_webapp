/**
 * Created by Zeo on 11/27/15.
 */
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');


// I want to bring back all the users who are in the same bookclub object as the user logged in
router.get('/allusers', function(req, res){

console.log("req.user",req.user.bookclubName_id);
        User.find({bookclubName_id: req.user.bookclubName_id},'prefBook prefLocation votePrefBook', function(err, data){
            if(err){
                console.log("ERROR! : ", err);
            }
            console.log("here is what is being sent to the user promis",data);
            res.send(data);
        });



});

//Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
//    if (err) return handleError(err);
//    console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
//})

module.exports = router;

//var people = require('../public/data/people');
//res.send(people);
//console.log(people);