var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.json('hello api');
});

module.exports = router;
