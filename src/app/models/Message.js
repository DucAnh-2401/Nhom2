const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const Message= new Schema({
    sender:{type:String},
    receiver:{type: String },
    messageText:{ type: String},
    chatRoom:{type:String}

})
module.exports = mongoose.model('Message',Message);