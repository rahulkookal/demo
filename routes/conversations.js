var express = require('express');
var router = express.Router();

/* GET conversations listing. */
router.get('/', function(req, res, next) {
  let client = global.connections.REPLICA_1
  console.log(req.params)
  let db = client.db('customer_1')
      col = db.collection('conversations');
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
      col = db.collection('conversations');
        col.insertOne(req.body.conversation, function(err, result){
          console.log(req.body.conversation)
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
      col = db.collection('conversations');
      col.find({ _id: ObjectId(req.params.id) }).toArray(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
});

router.put('/', function(req, res, next) {
  let client = global.connections.PRIMARY
  let conversation = req.body.conversation
  delete user._id;
  let updateValues = { $set: conversation };
  let db = client.db('customer_1')
      col = db.collection('conversations');
      col.findOneAndUpdate({ _id: ObjectId(req.body.user._id) }, updateValues).then(function(err, result) {        
        if(err){
          res.status(500).json(err).end()
        }
        res.status(200).json(result).end()
      });
  });

module.exports = router;