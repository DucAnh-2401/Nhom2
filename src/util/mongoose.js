module.exports={
    multipleMongoosetoObject:function(mongooses){
        return mongooses.map(mongoose=>mongoose.toObject());
    },
    MongoosetoObject:function(mongoose){
        return mongoose ? mongoose.toObject():mongoose
    }
}