const express= require('express')
const userControllers = require('../app/controllers/UserConstrollers')
const router= express.Router()
router.get('/:username_sign',userControllers.show)
router.post('/:username_sign',userControllers.update)
module.exports=router