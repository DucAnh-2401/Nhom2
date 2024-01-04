const User = require('../models/User')
class ActionControllers {
    register(req, res) {
        const username = 'Profile';
        const avatarpath = 'uploads/avatar-default.png';
        res.render('register', { username: username, avatarpath: avatarpath });
    }
    async formRegister(req, res,next) {
        //Lấy các giá trị trong form người dùng gửi lên ( sử dụng body-parser)
        const userPosition = req.body.userposition;
        const userName = req.body.username;
        const userNameSign = req.body.username_sign;
        const userEmail = req.body.useremail;
        const userPassword = req.body.userpassword;
        const confirm_UserPassord = req.body.confirm_userpassword;
        const avatarpath='uploads/avatar-default.png';
        //Thêm thông tin người dùng vào database
        const user = await User.find({
            username_sign: userNameSign
        })
        if (user.length === 0) {
            const newUser = new User({
                userposition: userPosition,
                useremail: userEmail,
                username: userName,
                username_sign: userNameSign,
                userpassword: userPassword,
                confirmpassword: confirm_UserPassord,
                avatar:avatarpath
            })
            await newUser.save();
            res.render('user_register')
        } else {
            res.send("Tên đăng nhập đã tồn tại !")
        }
    }
    login(req, res) {
        const username = 'Profile';
        const avatarpath = 'uploads/avatar-default.png';
        res.render('sign_in', { username: username, avatarpath: avatarpath })
    }
    async formLogin(req, res, next) {
        const userEmail = req.body.useremail;
        const userPassword = req.body.userpassword;
        //Kiểm tra thông tin người dùng trong có tồn tại trong database hay không
        try {
            const user = await User.findOne({
                useremail: userEmail,
                userpassword: userPassword
            })
            if (user === null) {
                res.render('sign_failed');
            } else {
                const username = user.username;
                const userposition = user.userposition;
                const username_sign = user.username_sign;
                req.session.username = username;
                req.session.username_sign = username_sign;
                req.session.userposition = userposition;
                res.redirect('/')
            }
        } catch (err) {
            console.log("Message:" + err)
        }
    }
    logout(req, res) {
        delete req.session.username;
        delete req.session.username_sign;
        delete req.session.userposition;
        res.redirect("/action/login");
    }
}
module.exports = new ActionControllers();