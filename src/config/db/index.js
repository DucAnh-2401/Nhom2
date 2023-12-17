const mongoose= require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/vieclam24h',{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log('Connect sucsessfully !')
    }catch(err){
        console.log("Error in connecting to database: "+ err);
    }
}
module.exports={connect};