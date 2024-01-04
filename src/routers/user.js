const express= require('express');
const userControllers = require('../app/controllers/UserConstrollers');
const router= express.Router();
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
var upload=multer({storage:storage});
router.post('/account',userControllers.change_account);
router.post('/user_post',upload.array("images"),userControllers.post);
router.get('/user_post',userControllers.show_post);
router.get('/profile/:username_sign',userControllers.show_profile);
router.post('/update_user_profile',upload.array("avatar"),userControllers.update_profile);
module.exports=router;