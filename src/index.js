const express = require('express')
const session = require('express-session');
const app = express()
const handlebars= require('express-handlebars')
const port = 3000
const path=require('path')
const route= require('./routers')
const db= require('./config/db')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to db
db.connect()
app.use(express.static(path.join(__dirname,"public")))
app.engine('hbs',handlebars.engine({
  extname:'.hbs'
}))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
// Cấu hình session middleware
app.use(session({
  secret: 'mysecretkey', // Khóa bí mật để mã hóa session
  resave: false,
  saveUninitialized: false
}));

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})