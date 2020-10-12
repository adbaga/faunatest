const express = require('express')
const router = express.Router()
const faunadb = require('faunadb'),
q = faunadb.query;
const serverClient = new faunadb.Client({ secret: process.env.MYAPIKEY });

if (serverClient){
  console.log("Faunadb connected")
}

router.get('/test', function (req, res) {
  res.send('GET request to the homepage')
})


router.get('/:id', function (req, res){ // or app.get
  const id = req.params.id;
  console.log('Test param: ' + id);

  try {

    idExist = serverClient.query(
      q.Exists(q.Ref(q.Collection('Accounts'), id))
    )

    if(!idExist) {

      return res.status(400).send(`ID ${id} doesn't exists`)
    }


    serverClient.query(
      q.Get(q.Ref(q.Collection('Accounts'), id))
    )
    .then((ret) => res.send(ret))


    
  } catch (error) {

    res.send("There is an error")
    
  }

  
});


module.exports = router;
  