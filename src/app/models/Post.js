const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const Post= new Schema({ 
    username:{type:String},
    avatar:{type:String},
    date:{type:String},
    decripstion:{type:String},
    images:{type:Array}
});
module.exports = mongoose.model('Post',Post);