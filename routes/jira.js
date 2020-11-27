const { generateKeyPair } = require('crypto');
const express = require('express');
const router = express.Router();
const axios = require('axios');
var crypto = require('crypto');
var uuid = require('node-uuid');
var fs = require('fs');

require('dotenv').config()


/*This code runs the authentication process for a Jira user to access their boards etc.

Waiting on approval to use Atlassian 3Lo authentication as this process is currently private */


router.get('/auth', async (req, res) => {
    
    let bound = crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    res.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=BwcommlWMhNokzLVEZ1jXfy5Y0CwAkkY&scope=read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project&redirect_uri=https%3A%2F%2Fauto-mark.netlify.app%2Fjira&state=${bound}&response_type=code&prompt=consent`);
})

router.post('/auth', async (req, res) => {
    let code = req.body.code

    let access  = await axios.post(`https://auth.atlassian.com/oauth/token`, 
        {"grant_type": "authorization_code",
        "client_id": process.env.REACT_APP_JIRA_CLIENT,
        "client_secret": process.env.REACT_APP_JIRA_SECRET,
        "code": code,
        "redirect_uri": "http://localhost:3000/jira"},
        {
            headers: {
              'Content-Type': 'application/json'
            }
        }
    ).then(results => {
        let access_token = results.data.access_token
        axios.get("https://api.atlassian.com/oauth/token/accessible-resources", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': "application/json"
            }
        }).then(clientData => {
            clientId = clientData.data[0].id
            res.send({clientId, access_token})
        })
    })
    .catch(err=> {
        res.send(err)
    })
})

router.post("/boards", (req, res) => {
    let {cloud, key} = req.body

    axios.get(`https://api.atlassian.com/ex/jira/${cloud}/rest/api/2/project`, {
        headers: {
            'Authorization': `Bearer ${key}`,
            'Accept': "application/json"
        }
    }).then(results => {
        res.send(results.data)
        // fs.writeFile('boards.txt', JSON.stringify(results.data), function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });
    }).catch(err => {
        res.status(400).send(err)
    })
})


module.exports = router;