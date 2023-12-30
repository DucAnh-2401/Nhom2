const User = require('../models/User')
const Post = require('../models/Post')
const excel = require('node-excel-export');
const fs = require('fs');
const { MongoosetoObject } = require('../../util/mongoose')
const { multipleMongoosetoObject } = require('../../util/mongoose')
class UserConstrollers {
    show(req, res, next) {
        User.findOne({
            username_sign: req.params.username_sign
        }).then(user => {
            //console.log(user)
            res.render("users/userdetail", { user: MongoosetoObject(user) })
            //res.json(user)
        }).catch(next)
    }
    async update(req, res, next) {
        //Lấy các giá trị từ form gửi đi
        const userName = req.body.username
        const userEmail = req.body.useremail
        const userPosition = req.body.userposition
        const userNameSign = req.body.username_sign
        const userPassword = req.body.userpassword
        const confirmPassword = req.body.confirm_userpassword
        //console.log(userName,userEmail,userNameSign,userPassword,userPosition)
        //res.send("Submit successfull !")
        User.findOneAndUpdate(
            //Điều kiện tìm kiếm
            { username_sign: req.params.username_sign },
            //Cập nhật các trường và giá trị mới
            {
                $set: {
                    userposition: userPosition,
                    username: userName,
                    useremail: userEmail,
                    userpassword: userPassword,
                    username_sign: userNameSign,
                    confirm_userpassword: confirmPassword
                }
            }
        ).then(user => {
            res.redirect('/user_management')
        }).catch(next)
    }
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

        //console.log(username_sign)
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
            res.redirect('user_profile/:username')
        }).catch(next)
        //console.log(username);
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
    async chart_user(req, res, next) {
        // Truy vấn dữ liệu từ MongoDB
        const users = await User.find();
        // Xử lý dữ liệu
        const number_of_users = users.length;
        let male = 0;
        let female = 0;
        let other_gender = 0;
        let labels=[];
        let data=[];
        users.forEach(user => {
            // Xử lý thông tin về giới tính
            if (user.gender == "male") {
                male += 1;
            } else if (user.gender == "female") {
                female += 1;
            } else {
                other_gender += 1;
            }
        })
        //Tìm kiếm 3 khu vực có nhiều người dùng nhất để vẽ biểu đồ
        User.aggregate([
            { $group: { _id: '$birthplace', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]).then(results => {
            results.forEach(result=>{
                labels.push(result._id);
                data.push(result.count);
            })
            
        }).catch(error => {
            console.error('Truy vấn dữ liệu người dùng không thành công:', error);
        });
        // Render biểu đồ sử dụng Handlebars
        res.render('management/chart_user', {
            male, female, other_gender, number_of_users,labels:labels,data:data
        });
    }
    async export_data(req, res, next) {
        try {
            // Lấy danh sách người dùng từ MongoDB
            const userList = await User.find().lean().exec();

            // Định nghĩa cấu trúc của báo cáo
            const specification = {
                userposition: {
                    displayName: 'Vai trò',
                    headerStyle: { font: { bold: true } },
                    width: 120
                },
                useremail: {
                    displayName: 'Email',
                    headerStyle: { font: { bold: true } },
                    width: 200
                },
                username: {
                    displayName: 'Họ và tên',
                    headerStyle: { font: { bold: true } },
                    width: 120
                },
                username_sign: {
                    displayName: 'Tên đăng nhập',
                    headerStyle: { font: { bold: true } },
                    width: 120
                },
                userpassword: {
                    displayName: 'Mật khẩu',
                    headerStyle: { font: { bold: true } },
                    width: 120
                }
            };

            // Chuẩn bị dữ liệu cho báo cáo
            const dataset = userList.map(user => ({
                userposition: user.userposition,
                useremail: user.useremail,
                username: user.username,
                username_sign: user.username_sign,
                userpassword: user.userpassword
            }));

            // Tạo báo cáo Excel
            const report = excel.buildExport([
                {
                    name: 'Danh sách người dùng',
                    specification: specification,
                    data: dataset
                }
            ]);

            // Lưu báo cáo thành file Excel
            fs.writeFileSync('Danh_sach_nguoi_dung.xlsx', report, 'binary');
            console.log('User list exported to danh_sach_nguoi_dung.xlsx');

            // Gửi tệp tin Excel đính kèm trong phản hồi HTTP
            res.attachment('Danh_sach_nguoi_dung.xlsx');
            res.send(report);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('An error occurred');
        }
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
                    res.redirect('/sign_in')
                }).catch(err => {
                    console.log(err);
                })
        } else {
            res.send('Mật khẩu cũ không chính xác')
        }
    }
    async post_management(req,res,next){
        const posts=await Post.find();
        res.render('management/post_management',{posts:multipleMongoosetoObject(posts)})
    }
    async delete_post(req,res,next){
        const postId= req.body.id_post;
        Post.findOneAndDelete({ _id: postId })
            .then(post => {
                res.redirect('post_management');
            }).catch(err => {
                console.log(err);
            });
        
    }
}
module.exports = new UserConstrollers;