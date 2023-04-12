// require the library
const mongoose= require('mongoose');
const path= 'mongodb://localhost/codeial_dev';
//  const path = 'mongodb+srv://shubham21101997:1XKDfXnqsQmSfI8C@codeial.0y4o9t7.mongodb.net/?retryWrites=true&w=majority';
//connected to database -
mongoose.connect(path);

//acquire the connection to check if it is successful
const db=mongoose.connection;
//supress wRNING
mongoose.set('strictQuery', true);
//error
db.on('error' ,console.error.bind(console,'error connectiong to mongodb'));

//up and running print the message
db.once('open', function(){
    console.log('successfully connected to database');
})

module.exports=db;