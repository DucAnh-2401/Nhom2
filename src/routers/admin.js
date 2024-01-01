const express=require('express');
const router=express.Router();
const adminControllers=require('../app/controllers/AdminControllers');
router.post('/management/post/delete',adminControllers.delete_post);
router.get('/management/post',adminControllers.post_management);
router.get('/management/export-data',adminControllers.export_data);
router.get('/management/chart',adminControllers.chart_user);
router.get('/management/user',adminControllers.option_management);
router.post('/management/user/delete',adminControllers.delete);
router.post('/action/update-user/:id',adminControllers.update);
router.post('/insert-user',adminControllers.insertUser)
module.exports = router;