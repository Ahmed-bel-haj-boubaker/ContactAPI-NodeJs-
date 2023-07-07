const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type: String,
        required : [true,'Please add the username']
    },
    email:{
        type:String,
        required : [true,'Please add the email'],
        unique:[ true,"Email already exists"]
    },
    password:{
        type:String,
        required : [true,'Please add the password']
    }

});
userSchema.set('timestamps', true);
userSchema.set('createdAt', 'created_at');
userSchema.set('updatedAt', 'updated_at');

module.exports = mongoose.model('user', userSchema);