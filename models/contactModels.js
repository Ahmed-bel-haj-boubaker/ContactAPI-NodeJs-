const mongoose = require ('mongoose');
const contactShema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'  ,
        required:true

    },
    name: {
        type : String,
        required : [true,"Please add the contact name"]
    },
    email:{
        type :String ,
        required : [true,"Please add the contact email"]
    },
    phone: {
        type : Number,
        required : [true,"Please add the contact Phone"]
    }, 
       

  
    });
    contactShema.set('timestamps', true);
    contactShema.set('createdAt', 'created_at');
    contactShema.set('updatedAt', 'updated_at');
    
    module.exports = mongoose.model('Contact', contactShema);