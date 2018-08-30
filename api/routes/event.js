const express = require('express');
const router = express.Router();
const conEvent = require('../controller/con-event');
const checkAuth = require('../middleware/check-auth');


/* ****************************Add Event PostGrase**************************** */
router.post('/add', checkAuth, conEvent.addEvent);

/* ****************************Get Event By Id**************************** */
router.get('/get/:id', checkAuth, conEvent.getEventById);

module.exports = router;