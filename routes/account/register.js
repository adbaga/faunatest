const express = require('express');
const { serve } = require('swagger-ui-express');
const router = express.Router()
const faunadb = require('faunadb'),
q = faunadb.query;
const serverClient = new faunadb.Client({ secret: process.env.MYAPIKEY });

if (serverClient){
  console.log(serverClient)
}

router.post('register'), async function (req, res) {

    const { email, password, username, role} = req.body;
  
    if (!email || !password) {
  
      return res.status(400).send('Email and Password not provided');
    }
  
  
  
    try {
  
      const existingEmail = await serverClient.query(
  
        q.Exists(q.Match(q.Index('unique_Accounts_email'), q.Casefold(email)))
      );
  
      if (existingEmail) {
        return res.status(400).send(`Email ${email} already exists`)
      }
  
      const user = await serverClient.query(
        q.Create(q.Collection('Accounts'),
        {
          credentials: { password},
          data: {
            email,
            username,
            role
          },
        })
      );
  
  
      const auth = await guestClient.query(
        q.Login(user.ref, {
          password,
        })
      );
  
  
      if (!auth.secret) {
        return res.status(404).send('auth secret is missing');
      }
  
      setAuthCookie(res, auth.secret);
  
      res.status(200).end();
    }
  
    catch (error) {
      console.error(error);
      res.status(error.requestResult.statusCode).send(error.message);
    }

  }


  module.exports = router;