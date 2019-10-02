var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
 
	service: 'yahoo',
  
    auth: {
        user: 'cambridgecareservices@yahoo.com',
        pass: 'Password@yahoo.com',
  }
});

module.exports.emailTransporter = transporter;