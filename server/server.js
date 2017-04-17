const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'',
	database:'kugou',
	multipleStatements: true
})

const getHandler = require('./getRequestHandler');
const postHandler = require('./postRequestHandler');

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(express.static('path'))

getHandler(app,db);
postHandler(app,db);

app.listen(9988);