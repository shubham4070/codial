const User = require('../models/user')
const Post = require('../models/post');


module.exports.profile= function(req,res){

  //find the cookies
  User.findOne({_id:req.user.id})
  .then(function(user){ // user is referring to document
    // if session is  created
    if(user){
      Post.find({user:req.user._id})// getting the post for the particular User
       .populate('user')
       .populate({
         path: 'comments',
         populate:{
          path: "user"
         }
       })
        .then(function(posts){
          return res.render('user_profile',{
            name: user.name,
            Posts: posts,
            email:user.email,
            user: user
          })
        })
        .catch(function(err){
         console.log("error while getting post", err);
         return res.redirect('back');
      })
      
    }
    else{
      return res.redirect('/users/sign-in');
     } 
    
    
    // if cookies is not created
     
  })
  //if some error occur
  .catch(function(err){
    console.log('error in finding user in logging in to profile',err);
    return res.redirect('back');
})

    
}



module.exports.sign_in = function(req,res){
    res.render('sign-in',{
        title : "Sign-in"
    });
}

module.exports.sign_up = function(req,res){
    res.render('sign-up',{
        title : "Sign-up",
        action : "/users/create"
    });
}

//get the sign- up data
/*module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
          console.log('error in finding user in signing up', err);
          return;
        }
         if(!user){
            User.create(req.body,function(err,user){
                if (err) {
                    console.log('error in creating user while signing up', err);
                    return;
                  }
                return res.redirect('/users/sign-in');   
            })
         }else{
            console.log("user already exists");
            return res.redirect('back');
         }
      });
}*/
// create the user 
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
      .then(function(user) {
        if (!user) {
          User.create(req.body)
            .then(function(user) {
              return res.redirect('/users/sign-in');
            })
            .catch(function(err) {
              console.log('error in creating user while signing up', err);
              return res.redirect('back');
            });
        } else {
          console.log('user already exists');
          return res.redirect('back');
        }
      })
      .catch(function(err) {
        console.log('error in finding user in signing up', err);
        return res.redirect('back');
      });
  };
  

//sign in and create session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

// delete the session to sign out
module.exports.sign_out = function(req,res){
  req.logout(function(err){
    if(err){
      console.log("Error logging out:", err);
      return ;
    }

   return  res.redirect('/users/sign-in');
  });
}

// edit the user profile
module.exports.edit = function(req,res){
   return res.render('edit-profile',{
      action: "/users/update"
   });
}
// updating the profile
module.exports.update = function(req,res){
  User.findByIdAndUpdate({_id:req.user.id},req.body)
    .then(function(user){
      console.log("Sucessfully updated the profile");
      return res.redirect("/users/profile");
    })
     .catch(function(err){
        console.log("Error while updating the profile",err);
        return res.redirect("/users/profile");
     })
}

