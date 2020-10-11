var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({test: "sds"});
});

router.post('/', function(req, res, next) {
  let client = global.connections.PRIMARY
  let db = client.db('customer_1')
        col = db.collection('users');
        col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
          console.log("ee")
        // })
  res.json({test: "sds"});
});

module.exports = router;
