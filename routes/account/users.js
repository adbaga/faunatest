const express = require('express')
const router = express.Router()
const faunadb = require('faunadb'),
q = faunadb.query;
const serverClient = new faunadb.Client({ secret: process.env.MYAPIKEY });

if (serverClient){
  console.log("Faunadb connected")
}


router.use('/:id', function (req, res){ // or app.get
  var id = req.params.id;
  console.log('Test param: ' + id); // "Test param: foo"
  serverClient.query(
            q.Get(q.Ref(q.Collection('Accounts'), id))
          )
          .then((ret) => res.send(ret))
});




module.exports = router;
  