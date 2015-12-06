/**
 * Created by Zeo on 12/2/15.
 */
var express = require('express');
var router = express.Router();

var path = require('path');
var mongoose = require('mongoose');
var User = require('../models/user');
var BookClub = require('../models/bookClub');

mongoose.set('debug', true);


//var to catch the users book club
var usersBookClub='';



//this gets the logged in user object
router.put('/loggedin', function(req,res,next) {


    //usersBookClub=req.user.bookclubName_id;
    //
    //console.log("This is the logged in user object", req.body);
    //
    //console.log("where is the user", req.user);


    User.findByIdAndUpdate(req.user._id, {$set: {votePrefBook: true}}, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {


            res.send(theUser);
            next
        }
    });
});
//this updates the user document by the id and adding voteprefbook to communicate that the user has voted


    router.put('/updatebook', function(req,res,next){
        //{
        //    book_id: {type:String},
        //    numberOfVotes: Number
        //}
        var bookvotedOn=req.body.bookinfo;



        console.log("In voting Route, he is what req is",req.body);
        //console.log("In voting Route book voted on, Updatebook", req.user);


        BookClub.findByIdAndUpdate(req.user.bookclubName_id, {$push:{votesCastForBook:req.body}},function(err,theUser){
            if(err){
                console.log("Homie, I'm not working ",err);
            }else {


                res.send(theUser);
                console.log("Things are going through");
                next
            }

        }) ;



});

console.log("does the userbookclub show up here", usersBookClub);
// this updates the book collection with the book that the user has voted on
//router.put('/updatebook', function(req,res,next){
//
//
//
//
//    console.log("This is what is coming up to bookclub", req.body);
//
//
//    BookClub.findByIdAndUpdate(req.user._id, {$set:{votePrefBook:true}},function(err,theUser){
//        if(err){
//            console.log(err);
//        }else {
//
//
//            res.send(theUser);
//        }
//    }) ;
//});

module.exports = router;