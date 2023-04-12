const express = require('express');
const port =8000;
const expressLayouts= require('express-ejs-layouts'); // importing the express-layouts
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db =require('./config/mongoose'); // importing mongoose config 
/*
   const session = require('express-session');, session refers to the express-session module that provides a middleware for managing session data in Express applications. The session module is used to create a session middleware that can be used to store user-specific data on the server side between requests, such as authentication state or shopping cart contents.
*/
const session = require('express-session');
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoDBStore = require('connect-mongodb-session')(session);
//sass middleware
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customeMiddleware = require('./config/middleware');
const app= express();  //creates an instance of the Express.js application
app.use(sassMiddleware({
    src :'./assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle : 'expanded',
    prefix: '/css',

}))
app.use(express.urlencoded({extended:true})); // it is used to parse incoming request bodies that are encoded in the application/x-www-form-urlencoded format

app.use(cookieParser());//middleware in Express.js is used to parse the Cookie header of an incoming HTTP request

app.use(express.static('./assests'));

// this middleware, it allows us to define a layout for our entire application
app.use(expressLayouts);

// extract styles and scripts from subpage into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/codeial_dev',
    //uri :'mongodb+srv://shubham21101997:1XKDfXnqsQmSfI8C@codeial.0y4o9t7.mongodb.net/?retryWrites=true&w=majority',
    collection: 'sessions'
});


/*
 name: Sets the name of the session cookie to "codial".

secret: Sets the secret used to sign the session ID cookie. This should be changed to a strong, random value before deploying the application to production.

saveUninitialized: Sets whether to save new, uninitialized sessions to the store. In this case, it is set to false, which means that new sessions will not be saved unless they are modified.

resave: Sets whether to save sessions that have not been modified. In this case, it is set to false, which means that sessions will not be saved unless they have been modified.

cookie.maxAge: Sets the maximum age of the session cookie, in milliseconds. In this case, it is set to 1 hour (3600 seconds * 1000 milliseconds).

store: Store the session in the databases/some distributed system . so that it makes session persistent.
*/
app.use(session({
    name: "codial",
    //TODO chnage the secret before deployment to production
    secret : "blahsomething",
    saveUninitialized : false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 60 * 24) // equivalent 24 hour
    },
    store: store
}));

/*
  The passport.initialize() middleware initializes the Passport framework and prepares it for use in the application. The passport.session() middleware provides  login sessions using Passport, allowing users to remain authenticated across multiple requests. 

*/
app.use(passport.initialize());
app.use(passport.session()); // middleware is used to set up persistent login sessions for authenticated users.
/*
When a user logs in using Passport.js, the user's information is serialized into a cookie, which is stored in the user's browser. The passport.session() middleware reads this cookie on subsequent requests to the server, and uses it to restore the user's information and authenticate the user for subsequent requests.

*/

app.use(passport.setAuthenticatedUser);

// flash notification
app.use(flash());
app.use(customeMiddleware.setflash);
//use express router
app.use('/', require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return ;
    }
    else{
        console.log(`My express server is up at port:${port}`);
    }
})