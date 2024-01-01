const express=require('express');
const router=express.Router();
const adminControllers=require('../app/controllers/AdminControllers');
router.post('/management/post/delete',adminControllers.delete_post);
router.get('/management/post',adminControllers.post_management);
router.get('/management/export-data',adminControllers.export_data);
router.get('/management/chart',adminControllers.chart_user);
router.get('/management/user',adminControllers.option_management)
router.post('/management/user/delete',adminControllers.delete)
router.get('/insert-user',adminControllers.insert_user)
router.post('/insert-user',adminControllers.insert_new_user)
module.exports = router;