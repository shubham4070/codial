const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');



router.get('/',homeController.home);
router.post('/about',homeController.home);

router.use('/users' , require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comment'));
// for any further routes, access from here
// router.use('/routesName', require('./routerFile))



module.exports=router