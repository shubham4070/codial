// require the library
const mongoose= require('mongoose');

//connected to database -
mongoose.connect('mongodb://localhost/codeial_dev');

//acquire the connection to check if it is successful
const db=mongoose.connection;

//error
db.on('error' ,console.error.bind(console,'error connectiong to mongodb'));

//up and running print the message
db.once('open', function(){
    console.log('successfully connected to database');
})

module.exports=db;