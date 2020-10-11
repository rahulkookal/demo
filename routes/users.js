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
        col.insertOne(req.body.user, function(err, result){
          console.log("ee")
          console.log(result)
          if(err){
            res.status(500).json(err).end()
          }
          res.status(200).json({test: "sds"}).end()
        })
});

module.exports = router;
