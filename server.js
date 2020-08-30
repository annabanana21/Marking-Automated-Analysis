const express = require('express')
const app = express()
const port = 8080;
const cors = require('cors')
const markRoute = require('./routes/marking')
const authRoute = require('./routes/accounts')
const jiraRoute = require('./routes/jira');

app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

app.use('/marking', markRoute )
app.use('/authenticate', authRoute)
app.use('/jira', jiraRoute)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))