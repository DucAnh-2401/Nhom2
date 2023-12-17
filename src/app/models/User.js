const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const User= new Schema({ 
    userposition:{type:String},
    useremail:{type:String},
    username:{type: String},
    username_sign:{type:String},
    userpassword:{type:String},
    confirmpassword:{type:String},
});
module.exports = mongoose.model('User',User);