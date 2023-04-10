const passport = require('passport');
// strategy which passport middleware will use
const localStrategy = require('passport-local').Strategy;

const user =require('../models/user');

//authentication using passport
passport.use(new localStrategy({
    usernameField : 'email' /*The usernameField option in the localStrategy 
    constructor refers to the name of the field in the HTML form that
     the user submits to login*/
    },
    function(email,password ,done){   
     /*
       The email and password fields in the function(email, password, done) refer to the values submitted by the user through an HTML form. Passport.js uses these values to authenticate the user and check if the values match the data stored in the database.
        
        
     */


       // find the user and establish the identity
       user.findOne({email:email})
       /*
          email as the key refers to a field in the database. user.findOne({email: email}) searches the database for a user with the specified email field.
        
       */
    .then(function(user){
      
        if(!user || user.password !=password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        else{
            return done(null,user);
        }
        
    })

  
    .catch(function(err) {
        console.log('error in finding user in signing up', err);
        return done(err);
      });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
  // console.log("user:",user.id);
    done(null, user.id); 
    /*we are putting user id in the cookies-session
    req.session.passport.user = {} */
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    /*
     The id in the deserializeUser function refers to the user ID that was serialized and stored in the session.
    
    */
  //  console.log("deserialization id :",id);
    user.findById(id)
    .then(function(user){
      return done(null,user);
    })
    .catch(function(err) {
        console.log('error in finding user in signing up', err);
        return done(err);
      });
});


//check if the user is authenticated
passport.checkAuthentication = function (req,res,next){
  // if the user is signed in then pass on the next function(controller's action);
  if(req.isAuthenticated()){
    return next();
  }
  // if the user is not signed in
  return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    //req.user contains the current signed in user from the session cookie and we are sending this to local for the views
    /*
    the req object is not directly available in the views by default. The req object and its properties are only available within the middleware and routing functions that handle the incoming requests.
However, you can make data available to the views by setting it on the res.locals object
    */
   res.locals.user = req.user;
  }
  next();
}

// if user is authenticated than it doesnot see sign-in or sign-up page
passport.checkStatus = function(req,res,next){
  if(req.isAuthenticated()){
     return res.redirect('/users/profile');
  }
  next();
}

module.exports = passport ;