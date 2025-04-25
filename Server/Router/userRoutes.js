const express = require('express');
const userController = require('../Controller/userController.js');
const router = express.Router();

router.get('/users',userController.getAllUser);
router.get('/user/:email',userController.getUser);
router.post('/adduser',userController.createUser);
router.put('/edituser/:email',userController.editUser);
router.delete('/deleteuser/:email',userController.deleteUser);

module.exports = router;