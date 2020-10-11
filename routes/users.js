var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let client = global.connections.REPLICA_1
  console.log(req.params)
  let db = client.db('customer_1')
      col = db.collection('users');
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
      col = db.collection('users');
        col.insertOne(req.body.user, function(err, result){
          console.log(req.body.user)
          if(err){
            res.status(500).json(err).end()
          }
          res.status(200).json(result).end()
        })
});

router.get('/:id', function(req, res, next) {
  let client = global.connections.REPLICA_1
  console.log(req.params)
  let db = client.db('customer_1')
      col = db.collection('users');
      col.find({ _id: ObjectId(req.params.id) }).toArray(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

router.put('/', function(req, res, next) {
  let client = global.connections.REPLICA_1
  console.log(req.params)
  console.log(req.body.user)
  let db = client.db('customer_1')
      col = db.collection('users');
      col.find({ _id: ObjectId("5f82c5d1f80cc754dc9d77ba") }).toArray(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

module.exports = router;
