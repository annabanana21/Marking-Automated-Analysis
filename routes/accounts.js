const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const {MongoClient} = require('mongodb');

let uri = process.env.REACT_APP_CLUSTER;
const client = new MongoClient("mongodb+srv://annabanana:StraponJohn2012@cluster0.i4zul.mongodb.net/sample_airbnb?retryWrites=true&w=majority");


async function createUser(client, newListing){
  const result = await client.db("automark_users").collection("user_info").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

router.post("/test", async (req, res) => {
  try {
    await client.connect();
    createUser(client, req.body)
    res.send('user added')
  } catch(err) {
    console.log(err)
  } finally {
    await client.close();
}

})



router.post("/", async (req, res) => {
    const { client_id, redirect_uri, client_secret, code } = req.body;

    try {
      let paramsString = await axios.post(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {})
      let params = new URLSearchParams(paramsString.data);
      
      const access_token = params.get("access_token");
      const scope = params.get("scope");
      const token_type = params.get("token_type");
  
      // Request to exchange code for an access token
          
      let user = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
        
      res.status(200).send({
        access_token,
        scope,
        token_type,
        user: user.data
      });
    } catch (err) {
      console.log(err)
      res.status(400).send(`User authentication error, ${err}`)
    }
  });

module.exports = router;