const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// refresh the page 
router.get('/refresh' ,function(req,res){
    res.redirect('back');
})
router.get('/',homeController.home1);
console.log('at routes index.js');
// router.post('/about',homeController.home);

router.use('/users' , require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comment'));
// for any further routes, access from here
// router.use('/routesName', require('./routerFile))



module.exports=router