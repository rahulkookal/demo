var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({test: "sds"});
});

router.post('/', function(req, res, next) {
  res.json({test: "sds"});
});

module.exports = router;
