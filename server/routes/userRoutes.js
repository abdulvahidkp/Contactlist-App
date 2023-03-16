const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController') 
const contactController = require('../controllers/contactController')

const verifyToken = require('../middleware/user.verifyToken')

router.post('/signup',userController.postSignup)
router.post('/signin',userController.postSignin)

router.get('/contact',verifyToken,contactController.getContacts)
router.post('/contact',verifyToken,contactController.addContact)
router.put('/contact',verifyToken,contactController.editContact)
router.delete('/contact',verifyToken,contactController.deleteContact)

module.exports = router;