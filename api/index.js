const express = require('express');
const router = express.Router();

router.use('/polls', require('./routes/polls'));
router.use('/vote', require('./routes/vote'));

module.exports = router;
