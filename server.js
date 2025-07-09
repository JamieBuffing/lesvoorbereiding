console.log("Server start nu");

const express = require("express");
const app = express();     
app.use(express.static('static'));
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require("mongodb");
const session = require("express-session");
const { maxHeaderSize } = require('http');
const multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {   // Als er niks is ingevuld of gewoon de home url. Toon dan index.ejs
    res.render('pages/index');
});

module.exports = app;
module.exports.handler = serverless(app);