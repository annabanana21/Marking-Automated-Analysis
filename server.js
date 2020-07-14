const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
var path = require('path');
const userRoute = require('./routes/accounts');


const puppeteer = require('puppeteer')

app.use(express.json());
  
app.use(cors());



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// This gets a list of the text of the page of comments
// TODO: 
//    - create Comment object that has the author, commit #, date?
//let actualComments = Array.from(document.querySelectorAll(".js-comment-body"))
//let revised = actualComments.map(comment => comment.children[0]);
//let revised = actualComments.map(comment => comment.children[0].textContent);

//This gets the entire object with the author, date, and comment
//let authors = document.querySelectorAll(".js-task-list-container");


app.use("/user", userRoute)

app.listen(port, () => {
  console.log('Listening on', port);
});