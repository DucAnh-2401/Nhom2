const express=require('express');
const router=express.Router();
const registerControllers=require('../app/controllers/RegisterController')
router.get('/',registerControllers.show);
router.post('/',registerControllers.register);
module.exports = router;