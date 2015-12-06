/**
 * Created by Zeo on 12/1/15.
 */
var express = require('express');
var router = express.Router();

var passport = require('passport');
var path = require('path');
//Route to Models for DB
var Users = require('../models/user');
var BookClub = require('../models/bookClub');


var bookClubName={};


router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});


router.post('/data', function(req,res,next){



    Users.create(req.body, function(err,post){

        if(err){
            next(err);
        } else {
            res.redirect('/');
        }
    }) ;
});


//break the register form apart so that i can put preferred book into an array
router.post('/', function(req,res,next){
     bookClubName={
        bookClubName: req.body.bookClubName
    };
    console.log("here is the bookclubname when it first enters the post",bookClubName);
    var prefBook=[{
        title: req.body.bookTitle,
        author: req.body.bookAuthor,
        summary: req.body.bookSummary
    }];

    var prefLocation= [{
        locationName:req.body.locationName,
        locationAddress: req.body.locationAddress
    }];

    var user1={
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        prefBook: prefBook,
        prefLocation: prefLocation
    };
    console.log("this is user1",user1);
    console.log("this is req",req.body);

    Users.create(user1, function(err,post){
        if(err){
            next(err);
        } else {
            next;
        }
    }) ;

    BookClub.create(req.body,function(err,post){
        if(err){
            next(err);
        } else{
            res.redirect('/')
        }
    });



});


module.exports = router;

//google api key
//AIzaSyCK9Ybu7Pj4BVl4I_hWt2g76fXuxBMwHHg