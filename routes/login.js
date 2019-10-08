const appConfig = require('../config/appConfig');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

module.exports.setRouter = (app)=>{
	console.log('in login')
	let baseUrl = `${appConfig.apiVersion}/login`;

	app.post( baseUrl, function(req,res){
		
		var encrypt = md5(req.body.Data.pword);

  			var sql = "select Emailid, Fname, Lname,  Tel, Role, stafftype, userid ,end_date from user where Emailid = '" + req.body.Data.email + "' AND Pword = '" + encrypt + "';";							
		  		 req.db.query(sql, function(error,result,fields){
		  			if(error){
		  					console.log(error);
		  					res.send({success:false, msg:"Issue at database"});
		  			}else{

		  				console.log(result);
		  			
		  				if (result.length === 0){
		  					res.send({success:false,msg:"Authentication failed"});
		  				}else{
		  					console.log(result[0]);
		  					console.log(new Date(result[0].end_date) < new Date('2038-01-19') )
		  					if(new Date(result[0].end_date) > new Date() ){

		  					const token = jwt.sign({
		  						"Emailid":result[0].Emailid,
		  						"Fname" : result[0].Fname,
		  						"Lname" : result[0].Lname,
		  						"Role" : result[0].Role,
		  						"Tel"   : result[0].Tel,
		  						"Stafftype" : result[0].stafftype,
		  						"UserId" : result[0].userid,
		  						"start_date":new Date(),
		  						"end_date":new Date('9999-12-31')

		  					}, 'nandakumar');
		  				
		  					res.send({success:true,
		  							  "Emailid" : result[0].Emailid,
		  							  "Fname" : result[0].Fname,
		  							  "Lname" : result[0].Lname,
		  							  "Tel"   : result[0].Tel,
		  				        	   "Role" :result[0].Role,
		  							   "Stafftype" : result[0].stafftype,
		  							   "UserId" : result[0].userid,
		  							   "Token" : token	});

		  					}else{

		  							res.send({success:false,msg:"User is locked"});

		  					}
	  				}
	  			}
	  		})
	  	}
	)
};