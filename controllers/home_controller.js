const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
  // console.log(req.cookies); 
  // res.cookie('user_id',23);
  // return res.render('home',{
  //     title: "Home"
  //   });

   Post.find().populate('user')/*
   This means that the "Post" documents in the query result will have their "user" fields replaced with the corresponding user document from the "users" collection.
   
   */

   /* the second populate()
   This is a nested population because we want to also include the "user" field of each comment document in the query result
   
   */
    .populate({
      path : 'comments',
      populate:{
        path: 'user'
      }
    })
     .then(function(posts){
       User.find()
        .then(function(user){
            return res.render('home',{
            title: "Codial | Home",
            Posts: posts,
            all_users: user
          })
        })
        .catch(function(err){
          console.log("Error while finding the user",err);
           return res.redirect('/');
        })
         
      })
     .catch(function(err){
          console.log("Error while getting the post on home screen",err);
          return res.redirect('/');
     })  
}

//  Example of above code look like

/*

[
  {
    _id: "post1",
    content: "Hello world!",
    user: {
      _id: "user1",
      name: "Alice",
      email: "Alice@gmail.com"
      ...
    },
    comments: [
      {
        _id: "comment1",
        content: "Nice post!",
        user: {
          _id: "user2",
          name: "Bob",
          email: "Bob@gmail.com"
          ...
        },
        ...
      },
      {
        _id: "comment2",
        content: "Thanks for sharing!",
        user: {
          _id: "user2",
          name: "Bob",
          email: "Bob@gmail.com"
          ...
        }
      }
    ]
  },
  ...
]

















*/