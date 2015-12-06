/**
 * Created by Zeo on 12/4/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Create bookClub Schema
var BookClubSchema= new Schema({
    bookClubName: {type: String},
    numberOfMembers: Number,
    bookclubMembers: [
        {
            user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
    ],

    votesCastForBook:
        {
            numberOfVotes: Number,
            _id: {type:Schema.ObjectId},
             title: {type:String},
            author: {type:String},
            summary: {type:String}

        }
    ,
    votesCastForLoc: Number,
    selectedLocation:[
        {
            locationName: {type: String},
            locationAddress: {type: String}

        }
    ],
    selectedBook: [
        {
            title: {type: String},
            author: {type: String},
            summary: {type: String}
        }
    ]
});

module.exports = mongoose.model('BookClub', BookClubSchema);