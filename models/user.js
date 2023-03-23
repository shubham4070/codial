const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true
    },
    
    password:{
        type: String,
        required :true,
        unique : true
    },

    name:{
        type: String,
        required : true
    },
    timestamps: true
});
// the name of collection('user') to be stored in database
const user = mongoose.model('user',userSchema);

module.exports = user;