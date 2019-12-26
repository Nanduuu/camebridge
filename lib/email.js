var nodemailer = require('nodemailer');
const emailTrasporter = require('./emailTransporter');

var transporter =  emailTrasporter.emailTransporter;

function sendEmail( data ){


	var html = '<style> table { border-collapse: collapse;	} table, td, th { border: 1px solid black;} </style>';

			if (data.msg){
				html += `<h3> ${data.msg} </h3>`;
			}else{
				html += '<h3>Below is the job details </h3>';
			}

	  		 		
	  
		html +=    '<table style= "border: 1px solid black;">'+
	  		 		'<td> Hospital </td>' +
	  		 		'<td> Date </td>' +
	  		 		'<td> Start Time </td>' +
	  		 		'<td> End Time </td>' ;

	  if(Array.isArray(data.info) == true){
		  console.log(data.info)
	  	   for(let i = 0; i < data.info.length ; i++){
	  	   	html += '<tr >' + 
	  					'<td >' + data.info[i].hospital + '</td>' +
	  					'<td >' + data.info[i].date.slice(0,10) + '</td>' +
	  					'<td >' + data.info.from_time.toISOString().slice(0,10) + '  '+ data.info.from_time.toISOString().slice(11,16)  + '</td>' +
	  					'<td > '+ data.info.to_time.toISOString().slice(0,10)  + '  '+ data.info.to_time.toISOString().slice(11,16) + '</td> '+
	  				'</tr>';

	  	   }

	  	   html += '</table> </br>'+
	  				'<a href="http://cambridgecareservices.co.uk/">Click here to Login </a>';
	  }else{
				 console.log( typeof data.info.from_time)
	  			html += '<tr >' + 
	  					'<td >' + data.info.hospital + '</td>' +
	  					'<td >' + data.info.date.slice(0,10) + '</td>' +
	  					'<td >' + data.info.from_time.toISOString().slice(0,10) + '  '+ data.info.from_time.toISOString().slice(11,16) +'</td>' +
	  					'<td > '+ data.info.to_time.toISOString().slice(0,10)  + '  '+ data.info.to_time.toISOString().slice(11,16) + '</td>'+
	  				'</tr>';
	  		    html += '</table> </br>'+
	  				'<a href="http://cambridgecareservices.co.uk/">Click here to Login </a>';
	  }

	  console.log(data.toList);

	var mailOptions = {
	  	from: 'cambridgecareservices@yahoo.com',
	  	to: data.toList,
	  	subject: 'Job notification from Cambridge Care Services',
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
module.exports = {sendEmail : sendEmail}