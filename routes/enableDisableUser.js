
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

const emailTrasporter = require('../lib/emailTransporter');

var transporter =  emailTrasporter.emailTransporter;

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/enableDisableUser`;
	app.post( baseUrl, verify.verifyAdminToken , function(req,res){
				
		var current_date = new Date(req.body.Data.end_date);
		var end_date = new Date('2038-01-18');

		var data = {};
		console.log(current_date);
		console.log(end_date)

		if (current_date < end_date){
			data.end_date = new Date('2038-01-19');
		}else{
			data.end_date = new Date( );
		}
		
		console.log(current_date);
		console.log(data)
		let sql_updateUserDetails = `UPDATE user  SET ? where Userid = ${req.body.Data.Userid};`;
	
		req.db.query(sql_updateUserDetails, data,function(err,result){
			console.log(err);

			if(err){
				console.log(err)
				res.send({success:false,msg:"Issue with database"});
			}else{
							console.log(result);
							req.db.query(`select * from user where Userid = ${req.body.Data.Userid};`, function(err,result){
								if(err){
									res.send({success:false,msg:"Issue with database"})
								}else{

									if (current_date < end_date){
										var html = `<h3> Hi ${result[0].Fname} </h3><p> Your id is enabled to login.</p><a href="http://3.8.149.133/">Click here to login </a>`;
									}else{
										var html = `<h3> Hi ${result[0].Fname} </h3><p> Your id is disabled to login.</p><p>Please contact Cambridgecre services </p>`;
									}
									var mailOptions = {
										from: 'cambridgecareservices@yahoo.com',
										to: result[0].Emailid,
										subject: 'Notification from Cambridge Care Services',
										html,
									}; 

									console.log(mailOptions);

									transporter.sendMail(mailOptions, function(error, info){
										if (error) {
											  console.log(error);
										} else {
											  console.log('Email sent: ' + info.response);
					  
									  }
									});

									res.send({success:true,msg:"Successfully updated"})
								}
							})
							
						}
				})
			}

	)
}


