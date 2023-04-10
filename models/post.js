const mongoose = require('mongoose');
const Comment = require('./comments');


const postSchema = new mongoose.Schema({
   content:{
      type: String ,
      required: true
   },
/*   Each post will in a database and has reference to user id    */
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   // include the array of all comments for each post schema
   comments :[
      {
          type : mongoose.Schema.Types.ObjectId,
          ref: "Comment"
      }
  
   ],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Post = mongoose.model('Post', postSchema); 

module.exports=Post ;