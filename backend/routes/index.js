const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

/* GET welcome message */
router.get('/', function(req, res, next) {
  logger.info("GET /");
  res.json({"message": "Welcome to the backend!"});
});


router.use('/users', require('./usersController.js'));

module.exports = router;