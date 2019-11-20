const express = require('express');
const mysql = require('mysql');
var nodemailer = require('nodemailer');
const formidable = require('express-formidable');
const fs = require('fs');

var nodemailer = require('nodemailer');
const emailTrasporter = require('../lib/emailTransporter');

var transporter =  emailTrasporter.emailTransporter;

function sendEmail( data ){


	var html = `<P> ${data.message} </p>`;

	
	 


	

	var mailOptions = {
	  	from: 'cambridgecareservices@yahoo.com',
	  	to: data.email +',' + 'info@cambridgecareservices.co.uk' + ',litumahi@gmail.com',
	  	subject: 'User notification',
	  	html,
	  				
	  
	}; 


	transporter.sendMail(mailOptions, function(error, info){
  				if (error) {
  			  		console.log(error);
  				} else {
   				 	console.log('Email sent: ' + info.response);
   				 
				}

	})
}


module.exports.setRouter = (app)=>{
	app.post('/api/email/', function(req,res){
	
		sendEmail(req.body);
		res.send({success:true,message:"Message posted successfully"})
	})

}

