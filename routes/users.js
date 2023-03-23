const express= require('express');
const router = express.Router();

const userControllers = require('../controllers/users_controllers');

router.get('/profile' ,userControllers.profile);
// router.post('/post', userControllers.post);

router.get('/sign-in',userControllers.sign_in);
router.get('/sign-up', userControllers.sign_up); 


module.exports=router;