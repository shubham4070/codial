const express= require('express');
const router = express.Router();
const passport =require('passport');
const session = require('express-session');

const userControllers = require('../controllers/users_controllers');

router.get('/profile',passport.checkAuthentication,userControllers.profile);
// router.post('/post', userControllers.post);

router.get('/sign-in',passport.checkStatus,userControllers.sign_in);
router.get('/sign-up', passport.checkStatus,userControllers.sign_up); 

// create the user
router.post('/create', userControllers.create);

// delete the session
// router.get('/delete-session' , userControllers.deleteSession);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect :'/users/sign-in'}
),userControllers.createSession)

router.get('/delete-session',userControllers.sign_out);

// edit the profile
router.get('/edit',userControllers.edit);
//update the profile
router.post("/update",userControllers.update);

module.exports=router;