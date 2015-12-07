/**
 * Created by Zeo on 11/30/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


//Create User Schema
var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email: {type:String},

    bookclubName_id:{type:mongoose.Schema.Types.ObjectId, ref:'BookClub'},
    votePrefBook: {type:Boolean},
    votedBook:
    {
        title: {type:String},
        author:{type:String},
        summary:{type:String}

    },

    booksLiked:[{type:Array}],
    locationsLiked:{type:Array},


    prefBook:[
        {
            title: {type:String},
            author:{type:String},
            summary:{type:String}
        }
    ],
    prefLocation:[
        {
            locationAddress: {type:String},
            locationName:{type:String}
        }
    ]
    //{locationName:String, locationAddress:String}
});


UserSchema.pre('save', function(next){

    var user = this;

    if(!user.isModified('password')) return next;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);