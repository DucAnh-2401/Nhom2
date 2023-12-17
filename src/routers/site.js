const express= require('express')
const siteControllers = require('../app/controllers/SiteControllers')
const router= express.Router()
router.get('/',siteControllers.home)
router.get('/user_management',siteControllers.option_management)
router.post('/delete',siteControllers.delete)
router.get('/insert_user',siteControllers.insert_user)
router.post('/insert_user',siteControllers.insert_new_user)
router.get('/logout',siteControllers.logout)
router.get('/user_profile',siteControllers.show)
module.exports=router