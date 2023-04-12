const User = require('../models/user')
const Post = require('../models/post');


module.exports.profile= async function(req,res){
try{
    //find the cookies-seesion
  let user = await User.findOne({_id:req.user.id});
  // if session is  created
  if(user){
     let posts =  await Post.find({user:req.user._id})// getting the post for the particular User
     .populate('user')
     .populate({
       path: 'comments',
       populate:{
        path: "user"
       }
     });
      
     return res.render('user_profile',{
          name: user.name,
          Posts: posts,
          email:user.email,
          user: user
        })
  }
 
}catch{
  req.flash('error','Login first');
   console.log('error in fetching the user');
   return res.redirect('/users/sign-in');
}
    
}



module.exports.sign_in = function(req,res){
  
    res.render('sign-in',{
        title : "Sign-in"
    });
}

module.exports.sign_up = function(req,res){
  // req.flash('success','Successfully sign up');
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
module.exports.create = async function(req, res) {
  try{
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
     let user = await User.findOne({ email: req.body.email })
        
          if (!user) {
            await User.create(req.body)
            req.flash('success','Successfully user created');
            return res.redirect('/users/sign-in');
              
          } else {
            req.flash('error','email id is already in use');
            console.log('user already exists');
            return res.redirect('back');
          }
  }catch{
         console.log("error",err);
         return;
    }
      
  };
  

//sign in and create session for the user
module.exports.createSession = function(req,res){
  req.flash('success','Successfully signed in');
    return res.redirect('/users/profile');
}

// delete the session to sign out
module.exports.sign_out = function(req,res){
  req.logout(function(err){
    if(err){
      req.flash('error','Unable to log out!');
      console.log("Error logging out:", err);
      return ;
    }
    req.flash('success','Successfully Logged out!');
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

