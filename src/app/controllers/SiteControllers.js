
const User = require('../models/User')
const Post = require('../models/Post')
const {multipleMongoosetoObject}=require('../../util/mongoose')
const {MongoosetoObject}=require('../../util/mongoose')
class SiteControllers {
    async home(req,res,next){
        const username = req.session.username;
        const userposition = req.session.userposition;
        Post.find().then(posts=>{
            
            res.render('home',{username,userposition,posts:multipleMongoosetoObject(posts)})
        })
        .catch(next)
    }
    
    async option_management(req, res, next) {
        const username = req.session.username;
        const userposition = req.session.userposition;
        User.find().then(users=>{
            res.render('user_management',{username,userposition,users:multipleMongoosetoObject(users)})
        }).catch(next)  
    }
    async delete (req,res){
        const userId=req.body.itemId
        User.findOneAndDelete({_id:userId})
        .then(user=>{
            res.redirect('/user_management') 
        }).catch(err=>{
            console.log(err)
        });
    }
    async insert_user(req,res,next){
        res.render('users/insert_user')
    }
    async insert_new_user(req,res,next){
        //Lấy các giá trị trong form người dùng gửi lên ( sử dụng body-parser)
        const userPosition = req.body.userposition;
        const userName = req.body.username;
        const userNameSign = req.body.username_sign;
        const userEmail = req.body.useremail;
        const userPassword = req.body.userpassword;
        const confirm_UserPassord = req.body.confirm_userpassword;
        //Thêm thông tin người dùng vào database
        insert_NewUser();
        async function insert_NewUser() {
            const user = await User.find({
                username_sign: userNameSign
            })
            
            if (user.length===0) {
                const newUser = new User({
                    userposition: userPosition,
                    useremail: userEmail,
                    username: userName,
                    username_sign: userNameSign,
                    userpassword: userPassword,
                    confirmpassword: confirm_UserPassord
                })
                await newUser.save()
                console.log("Add new user successfully !!!")
                res.redirect('user_management')
            } else {
                res.send("Tên đăng nhập đã tồn tại !")
            }

        }
    }
    logout(req,res){
        req.session.username='Profile';
        req.session.userposition='Position';
        res.redirect('/')
    }
    async show(req,res,next){
        const username =req.session.username;
        const username_sign=req.session.username_sign;
        console.log(username_sign)
        console.log(username)
        Post.find({username:username})
        .then(posts=>{
            console.log(posts)
            res.render('users/user_profile',{username, username_sign,posts:multipleMongoosetoObject(posts)})
        }).catch(next)
        
       
        
    }

}

module.exports = new SiteControllers();
