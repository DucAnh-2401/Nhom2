const User = require('../models/User')
const Post = require('../models/Post');
const excel = require('node-excel-export');
const fs = require('fs');
const { MongoosetoObject } = require('../../util/mongoose');
const { multipleMongoosetoObject } = require('../../util/mongoose');
class AdminControllers {
    async post_management(req, res, next) {
        const username_sign = req.session.username_sign;
        const username = req.session.username;
        let avatarpath = 'uploads/logo.png';
        const user = await User.findOne({ username_sign: username_sign })
        if (user) {
            avatarpath = user.avatar;
        }
        const posts = await Post.find();
        res.render('management/post_management', { posts: multipleMongoosetoObject(posts), username: username, avatarpath: avatarpath })
    }
    async delete_post(req, res, next) {
        const postId = req.body.id_post;
        Post.findOneAndDelete({ _id: postId })
            .then(post => {
                res.redirect('post_management');
            }).catch(err => {
                console.log(err);
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
    async chart_user(req, res, next) {
        const username_sign = req.session.username_sign;
        const username = req.session.username;
        let avatarpath = 'uploads/logo.png';
        const user = await User.findOne({ username_sign: username_sign })
        if (user) {
            avatarpath = user.avatar;
        }
        // Truy vấn dữ liệu từ MongoDB
        const users = await User.find();
        // Xử lý dữ liệu
        const number_of_users = users.length;
        let male = 0;
        let female = 0;
        let other_gender = 0;
        let labels = [];
        let data = [];
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
            results.forEach(result => {
                labels.push(result._id);
                data.push(result.count);
            })

        }).catch(error => {
            console.error('Truy vấn dữ liệu người dùng không thành công:', error);
        });
        // Render biểu đồ sử dụng Handlebars
        res.render('management/chart_user', {
            male, female, other_gender, number_of_users, labels: labels, data: data,
            username: username, avatarpath: avatarpath
        });
    }
    async option_management(req, res, next) {
        const username = req.session.username;
        const userposition = req.session.userposition;
        const username_sign = req.session.username_sign;
        let avatarpath = 'uploads/logo.png';
        const user = await User.findOne({ username_sign: username_sign })
        if (user) {
            avatarpath = user.avatar;
        }
        User.find().then(users => {
            res.render('management/user_management', { username, userposition, users: multipleMongoosetoObject(users), avatarpath: avatarpath })
        }).catch(next)
    }
    async delete(req, res) {
        const userId = req.body.itemId
        User.findOneAndDelete({ _id: userId })
            .then(user => {
                res.redirect('/admin/management/user')
            }).catch(err => {
                console.log(err)
            });
    }
    async insertUser(req, res, next) {
        //Lấy các giá trị trong form người dùng gửi lên ( sử dụng body-parser)
        const userPosition = req.body.userposition;
        const userName = req.body.username;
        const userNameSign = req.body.username_sign;
        const userEmail = req.body.useremail;
        const userPassword = req.body.userpassword;
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
                userpassword: userPassword
            })
            await newUser.save();
            console.log("Add new user successfully !!!")
            res.redirect('/admin/management/user')
        } else {
            res.send("Tên đăng nhập đã tồn tại !")
        }

    }
    async update(req, res, next) {
        //Lấy các giá trị từ form gửi đi
        const userName = req.body.username;
        const userEmail = req.body.useremail;
        const userPosition = req.body.userposition;
        const userNameSign = req.body.username_sign;
        const userPassword = req.body.userpassword;
        User.findOneAndUpdate(
            //Điều kiện tìm kiếm
            { _id: req.params.id },
            //Cập nhật các trường và giá trị mới
            {
                $set: {
                    userposition: userPosition,
                    username: userName,
                    useremail: userEmail,
                    userpassword: userPassword,
                    username_sign: userNameSign,
                }
            }
        ).then(user => {
            res.redirect('../../../admin/management/user')
        }).catch(next)
    }
}
module.exports = new AdminControllers();