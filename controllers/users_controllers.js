const User = require('../models/user')
module.exports.profile= function(req,res){
  // console.log(req.cookies);
  //find the cookies
  User.findOne({_id:req.cookies.user_id})
  .then(function(user){ // user is referring to document
    // if session is  created
    if(user){
        res.render('user_profile',{
            title: "Codeial | Profile",
            email: user.email,
            name: user.name
        })
      
    }
    // if cookies is not created
    else{
          return res.redirect('/users/sign-in');
    }  
  })
  //if some error occur
  .catch(function(err){
    console.log('error in finding user in logging in to profile',err);
    return res.redirect('back');
})

    
}

module.exports.post= function(req,res){
    res.send("<h1>Your post successfully updated</h1>")
}

module.exports.sign_in = function(req,res){
    res.render('sign-in',{
        title : "Sign-in"
    });
}

module.exports.sign_up = function(req,res){
    res.render('sign-up',{
        title : "Sign-up"
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
    //TODO Later
}