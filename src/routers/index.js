const registerRouter=require('./register');
const siteRouter=require('./site');
const sign_inRouter=require('./sign_in');
const userRouter=require('./user');
const commentRouter=require('./comment');
function route(app){
    app.use('/comment',commentRouter)
    app.use('/sign_in',sign_inRouter)
    app.use('/register',registerRouter)
    app.use('/user',userRouter)
    app.use('/',siteRouter)
}
module.exports=route;