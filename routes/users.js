var express = require('express');
var router = express.Router();

const {insertUser} require('../db/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({test: "sds"});
});

router.post('/', function(req, res, next) {
  insertUser(req.body.user).then(() => {
    res.status(200).end()
  })
  .catch((err) => {
    console.log(err)
    res.status(500).end()
  })
});

module.exports = router;
