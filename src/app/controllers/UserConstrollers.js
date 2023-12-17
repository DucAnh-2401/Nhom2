const User = require('../models/User')
const {MongoosetoObject}=require('../../util/mongoose')
class UserConstrollers{
    show(req,res,next){
        User.findOne({
            username_sign:req.params.username_sign
        }).then(user=>{
            //console.log(user)
            res.render("users/userdetail",{user:MongoosetoObject(user)})
            //res.json(user)
        }).catch(next)
    }
    async update(req,res,next){
        //Lấy các giá trị từ form gửi đi
        const userName=req.body.username
        const userEmail=req.body.useremail
        const userPosition=req.body.userposition
        const userNameSign=req.body.username_sign
        const userPassword=req.body.userpassword
        const confirmPassword=req.body.confirm_userpassword
        //console.log(userName,userEmail,userNameSign,userPassword,userPosition)
        //res.send("Submit successfull !")
        User.findOneAndUpdate(
            //Điều kiện tìm kiếm
            {username_sign:req.params.username_sign},
            //Cập nhật các trường và giá trị mới
            {$set:{
                userposition:userPosition,
                username:userName,
                useremail:userEmail,
                userpassword:userPassword,
                username_sign:userNameSign,
                confirm_userpassword:confirmPassword
            }}
        ).then(user=>{
            res.redirect('/user_management')
        }).catch(next)
    }
}
module.exports=new UserConstrollers;