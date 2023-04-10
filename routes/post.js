const express= require('express');
const router = express.Router();
const passport =require('passport');
const session = require('express-session');


const post_controller = require('../controllers/post_controller');
router.post('/create' ,passport.checkAuthentication ,post_controller.create);
router.get("/destroy/:id",post_controller.delete);


module.exports=router;