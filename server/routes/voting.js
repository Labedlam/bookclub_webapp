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


// Get info on whether user has voted
        router.get('/checkuservote',function(req,res,next){
            //console.log("what is checkuservote rqe ",req);

            User.find({_id: req.user._id},'username prefBook prefLocation votePrefBook votedBook', function(err, data){
                if(err){
                    console.log("ERROR! : ", err);
                }
                //console.log("checkuservote response data",data);
                res.send(data);
            });
        });



//Get info on the bookclub of the user

        router.get('/haveallvotesbeencast',function(req,res,next){

            BookClub.find({_id: req.user.bookclubName_id},'bookclubMembers votesCastForBook ', function(err,theUser){
                if(err){
                    console.log("ERROR! : ", err);
                }
                console.log("haveallvotesbeencast data",theUser);
                res.send(theUser);
            });
        });

//this sets the given user's votePrefBook to true to indicate that they have voted
router.put('/loggedin', function(req,res,next) {

            User.findByIdAndUpdate(req.user._id, {$set:{votePrefBook: true}}, function (err, theUser) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log("what is user theUser here?",theUser.votePrefBook);
                    res.send(theUser.votePrefBook);
                    next
                }
            });
        });

//this sets the given user's voteBook to indicate which book this user voted for
router.put('/uservotedbook', function(req,res,next) {
            //console.log("I'M IN THE USERVOTEDBOOK ROUT THIS IS REQ.BODY",req.body);
            User.findByIdAndUpdate(req.user._id, {$set:{votedBook: req.body}}, function (err, theUser) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log("You have added this to the votedBook key in the user object",req.body);
                    //console.log("what is theUser in the votedbook route",theUser);
                    res.send(theUser);
                    next
                }
            });
        });


//this updates the user document by the id and adding voteprefbook to communicate that the user has voted


    router.put('/updatebook', function(req,res,next){


        //console.log("In voting Route, he is what req is",req.body);
        //console.log("In voting Route book voted on, Updatebook", req.user);


        BookClub.findByIdAndUpdate(req.user.bookclubName_id, {$push:{votesCastForBook:req.body}},function(err,theUser){
            if(err){
                console.log("Homie, I'm not working ",err);
            }else {


                res.send(theUser);
                //console.log("What is theUser in update book",theUser);
                next
            }

        }) ;



});


module.exports = router;