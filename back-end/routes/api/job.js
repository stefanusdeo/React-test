const express = require('express');
const router = express.Router();

// @route   GET api/job
// @desc    Test Route
// @access  public
router.get('/', (req, res) => res.send('job Route'));

module.exports = router;
