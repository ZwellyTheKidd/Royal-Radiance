const { Router } = require('express');
const authController = require('../controllers/authController');
// const multer = require('multer');

const router = Router();

router.get('/api/royalapp/getusers', authController.getUsers);
// router.post('/api/royalapp/register',multer().none(), authController.register);
// router.post('/api/royalapp/login',multer().none(), authController.login);
// router.get('/api/royalapp/user', authController.currentUser);
// router.post('/api/royalapp/logout', authController.logout);


module.exports=router;