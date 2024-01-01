const adminRouter=require('./admin');
const actionRouter=require('./action');
const commentRouter=require('./comment');
const userRouter=require('./user');
const siteRouter=require('./site');
function route(app){
    app.use('/admin',adminRouter)
    app.use('/action',actionRouter);
    app.use('/comment',commentRouter);
    app.use('/user',userRouter);
    app.use('/',siteRouter);
}
module.exports=route;