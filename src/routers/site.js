const express= require('express')
const siteControllers = require('../app/controllers/SiteControllers')
const router= express.Router()
router.get('/searching',siteControllers.searching)
router.get('/',siteControllers.home)
module.exports=router