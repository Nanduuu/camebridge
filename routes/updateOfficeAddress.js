const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var md5 = require('md5');
var upload = multer();

const formidable = require('express-formidable');
const fs = require('fs');

var app = express();

const router = express.Router();
var md5 = require('md5');

const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/updateOfficeAddess/`;
	app.post(baseUrl,function(req,res){

		var con = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "root",
			  database: "test"
			});
	
		con.connect(function(err) {
			  if (err) {
						  console.log(err);
						  res.send({success:false,msg:'Issue at conncting database'});
				  }else{
	
					  con.query('update officeaddress set ?',req.body , function(err,result){
						  if(err){
							  console.log(err);
						  }else{
							  console.log(result)
							  res.send({success:true,msg:'Updated'})
							  con.end();
						  }
					  })
					  
				  }
		  })
	})
	

}

