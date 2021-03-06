const express = require('express');
const { serve } = require('swagger-ui-express');
const router = express.Router()
const faunadb = require('faunadb'),
q = faunadb.query;
const serverClient = new faunadb.Client({ secret: process.env.MYAPIKEY });

if (serverClient){
  console.log(serverClient)
}

// GET method route
router.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
router.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

//get information about user
router.get('/user/:id', function (req, res){ // or app.get
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

router.delete('/user/:id', function (req, res){ // or app.get
  const id = req.params.id;
  console.log('Test param: ' + id); // "Test param: foo"

  
  serverClient.query(
    q.Delete(
      q.Ref(q.Collection('Accounts'), id)
    )
  )
  .then((ret) => console.log(ret))
  
});



router.put('user/:id', function (req, res){

  const id = req.params.id
  serverClient.query(
  q.Update(
    q.Ref(q.Collection('Accounts'), id),
    { data: { username: req.params.username } },
  )
)
.then((ret) => console.log(ret))


});





// router.post("/register", function(req, res) {
//   serverClient.query(
//     q.Create(
//       q.Collection('Accounts'),
//       { data: { 
          
//         username: "artyom",
//         password: 12345,
//         email: "artyom@mail.ru",
//         role: 'STUDENT'
    
//     } },
//     )
//   )
//   .then((ret) => console.log(ret))
//     res.send('GET request to homepage registring someone')
//   });



// module.exports = async (req, res) => {

//   const { account } = req.query;
//   if (!account) return res.status(400).json({ message: 'Account doesn\'t exist' });
  
//   if (!(await client.query(q.Exists(q.Match(q.Index('hits_by_slug'), slug)))))
//   await client.query(q.Create(q.Collection('hits'), { data: { slug: slug, hits: 0 } }));

// };




// import faunadb, { query as q } from "faunadb"


// router.route("/:id").get(async (req, res) => {
//   serverClient.query(

//     q.Create(
  
//       q.Collection('Accounts'),
//       { data: {
//         username: "ana",
//         email: "ana@mail.com",
//         role: STUDENT
  
//       }}
//     )
    
//   )
//     res.send('GET request to homepage')
//   });
//   module.exports = router;


















// router.post('/register', function (req, res){

//   serverClient.query(q.Create(

//     q.Collection('Accounts'),
//     {
//       data: {

//         username: req.body.username,
//         email: req.body.email,
//         role: req.body.role,
//         is_active: true,
//         note: req.body.note,
//         date_joined: Date.now()

        
        


        
//       }

//     })


//   )
    
    

// })







module.exports = router;











