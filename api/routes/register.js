const express = require('express');
const router = express.Router();
const conRegister = require('../controller/con-register');

/* ****************************Get all registered user**************************** */
router.get('/user/all', conRegister.getAllUser);

/* ****************************Get all registered user**************************** */
router.delete('/delete/all', conRegister.deleteAllregisterUser);

/* *******************************User Registration************************************* */
router.post('/user', conRegister.addUser);

module.exports = router;