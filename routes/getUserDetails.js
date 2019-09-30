
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getUserDetails`;
	app.post(baseUrl, verify.verifyAdminToken , function(req,res){
	
		let sql_getuserDetails = 'SELECT Emailid , Fname, Lname, Tel, Userid, stafftype, start_date, end_date from user where role = "staff";';
		

		req.db.query(sql_getuserDetails,function(err,result){

			if(err){
				res.send({success:false,msg:"Issue with database"});
			}else{
		//					console.log(result);
							res.send({success:true,userDetails:result});
						}
				})
			}

	)
}

