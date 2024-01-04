
const User = require('../models/User')
const Post = require('../models/Post')
const { multipleMongoosetoObject } = require('../../util/mongoose')
const { MongoosetoObject } = require('../../util/mongoose')
class SiteControllers {
    async home(req, res, next) {
        let username = req.session.username;
        let userposition = req.session.userposition;
        let username_sign = req.session.username_sign;
        let avatarpath = "uploads/avatar-default.png";
        if (username == null || userposition == null) {
            username = "Profile";
            userposition = "Position";
            Post.find().then(posts => {
                posts = posts.reverse();
                res.render('home', { username, userposition, avatarpath: avatarpath, posts: multipleMongoosetoObject(posts) })
            }).catch(next)
        } else {
            const avatar = await User.findOne(
                { username_sign: username_sign },
            )
            avatarpath = avatar.avatar;
            Post.find().then(posts => {
                posts = posts.reverse();
                res.render('home', { username, userposition, avatarpath: avatarpath,username_sign:username_sign,posts: multipleMongoosetoObject(posts) })
            }).catch(next)
        }
    }
    async searching(req, res, next) {
        const job = req.query.job;
        const location = req.query.location;
        const smallest = req.query.smallest_salary;
        const highest = req.query.highest_salary;
        console.log(job, location, smallest, highest);
        const posts = await Post.find({
            job: job,
            location: location
        })
        let username_sign;
        let username;
        let userposition;
        let avatarpath;
        try {
            username_sign = req.session.username_sign;
            const user = await User.findOne({
                username_sign: username_sign
            })
            username = user.username;
            userposition = user.userposition;
            avatarpath = user.avatar;
            console.log(avatarpath);
            if (avatarpath == undefined) {
                avatarpath = "logo.png";
            }
        } catch (err) {
            username = 'Profile';
            userposition = 'Position';
            avatarpath = 'logo.png';
        }

        console.log(posts)
        console.log(posts.length)
        if (posts == 0) {
            res.redirect('/')
        } else {
            res.render('home', { username, userposition, avatarpath, posts: multipleMongoosetoObject(posts) })
        }
    }

}

module.exports = new SiteControllers();
