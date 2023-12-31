const User = require('../models/User')
class RegisterControllers {
    show(req, res) {
        const username='Profile';
        const avatarpath='uploads/logo.png';
        res.render('register',{username:username,avatarpath:avatarpath});
    }
    register(req, res) {
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
                res.render('user_register')
            } else {
                res.send("Tên đăng nhập đã tồn tại !")
            }

        }
    }
}
module.exports = new RegisterControllers();