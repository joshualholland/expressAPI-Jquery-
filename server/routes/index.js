const express = require('express');
const ChirpsRouter = require('./chirps');

let router = express.Router();

router.use('/chirps', ChirpsRouter);

module.exports = router;

