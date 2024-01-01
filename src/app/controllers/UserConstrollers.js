const User = require('../models/User')
const Post = require('../models/Post')
const { MongoosetoObject } = require('../../util/mongoose')
const { multipleMongoosetoObject } = require('../../util/mongoose')
class UserConstrollers {
    async update_profile(req, res, next) {
        const images = [];
        //console.log(req.files)
        req.files.forEach(file => {
            file.path = file.path.replace(/\\/g, '/')
            file.path = file.path.substring(file.path.indexOf('uploads'))
            images.push(file.path)
        });
        const avatar=images[0];
        const username = req.body.username;
        const username_sign = req.body.username_sign;
        const address = req.body.address;
        const experience = req.body.experience;
        const birthplace = req.body.birthplace;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        const relationshipStatus = req.body.relationshipStatus;
        Post.updateMany({
            username_sign: username_sign
        }, {
            $set: {
                username: username,
                avatar:avatar
            }
        }).then(results => {
            console.log("Dữ liệu đã được cập nhật");
        })
        User.findOneAndUpdate({
            username_sign: username_sign
        }, {
            $set: {
                avatar: avatar,
                username: username,
                address: address,
                experience: experience,
                birthplace: birthplace,
                birthday: birthday,
                gender: gender,
                relationshipStatus: relationshipStatus
            }
        }).then(user => {
            res.redirect('../user/profile');
        }).catch(next)
    }
    async show_profile(req, res, next) {

        const username_sign = req.session.username_sign;
        let avatarpath;
        const user = await User.findOne({ username_sign: username_sign });
        const username = user.username;
        try {
            avatarpath = user.avatar;
            console.log(avatarpath)
        } catch (err) {
            avatarpath = 'logo.png';
        }
        Post.find({ username_sign: username_sign })
            .then(posts => {
                //console.log(posts)
                res.render('users/user_profile', { username, username_sign, avatarpath, posts: multipleMongoosetoObject(posts), user: MongoosetoObject(user) })
            }).catch(next)
    }
    async post(req, res, next) {
        const images = [];
        //console.log(req.files)
        req.files.forEach(file => {
            file.path = file.path.replace(/\\/g, '/')
            file.path = file.path.substring(file.path.indexOf('uploads'))
            images.push(file.path)
        });
        //console.log(images)
        const username_sign = req.session.username_sign;
        const username = req.session.username;
        const avatar = await Post.findOne({
            username_sign: username_sign
        })
        let avatar_path;
        try {
            avatar_path = avatar.avatar;
        } catch (err) {
            avatar_path = 'logo.png';
        }

        //console.log(username_sign);
        const location = req.body.location;
        const job = req.body.job;
        const startday = req.body.startday;
        const enday = req.body.enday;
        const experience = req.body.experience;
        const lowest_salary = req.body.lowest_salary;
        const highest_salary = req.body.highest_salary;
        const decripstion = req.body.decripstion;
        const post = await Post.create({
            username: username,
            username_sign: username_sign,
            location: location,
            job: job,
            startday: startday,
            enday: enday,
            experience: experience,
            lowest_salary: lowest_salary,
            highest_salary: highest_salary,
            decripstion: decripstion,
            images: images,
            avatar: avatar_path
        })
        post.save();
        //console.log(post);
        res.redirect("/")
    }
    async show_post(req, res, next) {
        res.redirect('/')
    }
    async change_account(req, res, next) {
        const username_sign = req.session.username_sign;
        const pass = await User.findOne({
            username_sign: username_sign
        })
        console.log(pass);
        const password = pass.userpassword;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        console.log(password, oldPassword, newPassword)
        if (password === oldPassword) {
            User.findOneAndUpdate({ username_sign: username_sign },
                {
                    $set: {
                        userpassword: newPassword,
                        confirmpassword: newPassword
                    }
                }).then(user => {
                    res.redirect('../action/login')
                }).catch(err => {
                    console.log(err);
                })
        } else {
            res.send('Mật khẩu cũ không chính xác')
        }
    }
}
module.exports = new UserConstrollers;