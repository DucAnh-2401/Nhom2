const express=require ('express')
const router= express.Router()
const sign_inController= require('../app/controllers/Sign_inController')
router.get('/',sign_inController.show)
router.post('/',sign_inController.sign_in)
router.get('/logout',sign_inController.logout)
module.exports=router;