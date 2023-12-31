const express=require ('express');
const router= express.Router();
const CommentController= require('../app/controllers/CommentControllers');
router.post('/post/:id',CommentController.comment);
module.exports=router;