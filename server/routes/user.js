/**
 * Created by Zeo on 12/1/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req,res){

    //console.log("this is req",req);
    res.send(req.user);
});

module.exports = router;