const express = require('express');
const router = new express.Router();

router.use('/visited', require('./visited_controller.js'));
router.use('/tovisit', require('./to_visit_controller.js'));


module.exports = router;
