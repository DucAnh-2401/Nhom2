const User = require('../models/User')
const Post = require('../models/Post')
const {multipleMongoosetoObject}=require('../../util/mongoose')
class Sign_inController {
    show(req, res) {
        res.render('sign_in')
    }
    sign_in(req, res) {
        const userEmail = req.body.useremail;
        const userPassword = req.body.userpassword;
        //Kiểm tra thông tin người dùng trong có tồn tại trong database hay không
        user_Signin()
        async function user_Signin() {
            try {
                const user = await User.findOne({
                    useremail: userEmail,
                    userpassword: userPassword
                })
                if (user === null) {
                    res.render('sign_failed')
                } else {
                    console.log(user)
                    const username= user.username
                    const userposition=user.userposition
                    const username_sign=user.username_sign
                    req.session.username = username;
                    req.session.username_sign=username_sign;
                    req.session.userposition = userposition;
                    res.redirect('/')
                }
            } catch (err) {
                console.log("Message:" + err)
            }
        }
        
    }
    logout(req,res){
        
       }
}

module.exports = new Sign_inController();