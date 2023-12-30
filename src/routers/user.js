const express= require('express')
const userControllers = require('../app/controllers/UserConstrollers')
const router= express.Router()
// Định nghĩa cấu hình cho multer
const multer = require('multer');
//Dinh nghia noi luu tru va cach lay file
const storage=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'./src/public/uploads')
    },
  filename:(req,file,callback)=>{
    callback(null,file.originalname)
  }
})
var upload=multer({storage:storage})
router.post('/delete_post',userControllers.delete_post);
router.get('/post_management',userControllers.post_management);
router.post('/account',userControllers.change_account);
router.get('/export_data',userControllers.export_data);
router.get('/chart',userControllers.chart_user)
router.post('/user_post',upload.array("images"),userControllers.post)
router.get('/user_post',userControllers.show_post)
router.get('/user_profile/:username',userControllers.show_profile)
router.post('/update_user_profile',upload.array("avatar"),userControllers.update_profile)
router.get('/:username_sign',userControllers.show)
router.post('/:username_sign',userControllers.update)

module.exports=router;