const express = require("express");
const app = express();
const serverless = require('serverless-http');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require("mongodb");
const session = require("express-session");
const multer = require('multer');
const path = require('path');

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

module.exports.handler = serverless(app);
