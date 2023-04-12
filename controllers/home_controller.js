const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
  
  // console.log(req.cookies); 
  // res.cookie('user_id',23);
  // return res.render('home',{
  //     title: "Home"
  //   });

   Post.find().populate('user')
   //This means that the "Post" documents in the query result will have their "user" fields replaced with the corresponding user document from the "users" collection.
   
   

   //the second populate()
   //This is a nested population because we want to also include the "user" field of each comment document in the query result
   
  
    .populate({
      path : 'comments', // gives the field name . comments is feild name in the Post.
      populate:{     // nesting populate. within comments feild we have user.
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
]*/

// using the async instead of nornal .This make code clean .
// async function return the promises
/*
   The async keyword is used to make a function as asynchronous, and the await keyword is used to pause the execution of a function until a promise is resolved.

*/
module.exports.home1 = async function(req,res){
  console.log('in the home ');
   try{
          let posts = await Post.find().populate('user')
          .populate({
            path : 'comments',
            populate:{
            path: 'user'
            }
          });
          let users = await User.find();

          return res.render('home',{
          title: "Codial | Home",
          Posts: posts,
          all_users: users
          })   

   } catch{
        console.log("Error",err);
        return res.redirect('/');
   }

}















