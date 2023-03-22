const express = require('express');
const port =8000;
const expressLayouts= require('express-ejs-layouts'); // importing the express-layouts
const app= express();

// this middleware, it allows us to define a layout for our entire application
app.use(expressLayouts);

// extract styles and scripts from subpage into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// middleware function ,to serve static files, such as images, stylesheets, and client-side JavaScript files.
app.use(express.static('./assests'));








app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return ;
    }
    else{
        console.log(`My express server is up at port:${port}`);
    }
})