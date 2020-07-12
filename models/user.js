const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    coordinates:{
        type:[Number],
        required: true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['Point']
    }
});

const User = new Schema({
    places:{
        type:[placesSchema]
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);
