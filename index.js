const express = require('express')
const db = require('./src/config/database');
const routeClient = require('./src/routes/client/index.route')
const routeAdmin = require('./src/routes/admin/index.route')
const path = require('path')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const app = express()


app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// connect database
db.connectDB()


// method override
app.use(methodOverride('_method'))

app.set('view engine', 'pug')
app.set('views', './src/recourses/views')


// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// data public
app.use(express.static(path.join(__dirname, 'src/public')))

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())

// routing
routeClient(app)
routeAdmin(app)

app.listen(3000, () => {
    console.log("app listening port 3000")
})