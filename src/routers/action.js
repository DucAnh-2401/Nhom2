const express=require('express');
const router=express.Router();
const actionControllers=require('../app/controllers/ActionControllers');
router.get('/register',actionControllers.register);
router.post('/register',actionControllers.formRegister);
router.get('/login',actionControllers.login);
router.post('/login',actionControllers.formLogin);
router.get('/logout',actionControllers.logout);
module.exports = router;