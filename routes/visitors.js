var express = require('express');
var router = express.Router();

/* GET visitors listing. */
router.get('/', function(req, res, next) {
  let client = global.connections.REPLICA_2
  console.log(req.params)
  let db = client.db('customer_1')
      col = db.collection('visitors');
      col.find({}).toArray(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

router.post('/', function(req, res, next) {
  let client = global.connections.PRIMARY
  let db = client.db('customer_1')
      col = db.collection('visitors');
        col.insertOne(req.body.visitor, function(err, result){
          console.log(req.body.visitor)
          if(err){
            res.status(500).json(err).end()
          }
          res.status(200).json(result).end()
        })
});

router.get('/:id', function(req, res, next) {
  let client = global.connections.REPLICA_2
  console.log(req.params)
  let db = client.db('customer_1')
      col = db.collection('visitors');
      col.find({ _id: ObjectId(req.params.id) }).toArray(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

router.put('/', function(req, res, next) {
  let client = global.connections.PRIMARY
  let visitor = req.body.visitor
  delete visitor._id;
  let updateValues = { $set: visitor };
  let db = client.db('customer_1')
      col = db.collection('visitors');
      col.findOneAndUpdate({ _id: ObjectId(req.body.visitor._id) }, updateValues).then(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

module.exports = router;