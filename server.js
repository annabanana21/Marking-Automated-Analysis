const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
var path = require('path');

const puppeteer = require('puppeteer')

app.use(express.json());
  
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

async function scrapeProduct() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.goto(url);
}

scrapeProduct("https://github.com/millardle/brainstation-instock/pull/23")

app.listen(port, () => {
  console.log('Listening on', port);
});