const Post= require('../models/Post');
class CommentControllers{
    async comment(req,res,next){
        const idPost=req.body.idPost;
        const contentComment=req.body.contentComment;
        const avatar=req.body.avatar;
        const username=req.session.username;
        const username_sign=req.session.username_sign;
        Post.findById({
            _id:idPost
        }).then(post=>{
            if(!post){
                console.log('Không tìm thấy bài viết')
            }else{
                const comment={
                    username:username,
                    username_sign:username_sign,
                    comment:contentComment,
                    avatar:avatar
                }
                post.listComments.push(comment);
                post.save();
                console.log(post);
            }
        })
        res.redirect("/")
    }
}
module.exports = new CommentControllers();