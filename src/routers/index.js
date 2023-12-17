const registerRouter=require('./register');
const siteRouter=require('./site');
const sign_inRouter=require('./sign_in');
const userRouter=require('./user');
const { sign_in } = require('../app/controllers/Sign_inController');
function route(app){
    app.use('/sign_in',sign_inRouter)
    app.use('/register',registerRouter)
    app.use('/user',userRouter)
    app.use('/',siteRouter)
}
module.exports=route;