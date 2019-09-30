const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter= (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getJobDetails`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
				
				var sql = `select * from jobs  where date >= "${req.body.Data.from_date}" and date <= "${req.body.Data.to_date}" ;`
				req.db.query(sql,function(err,result){
					console.log(sql)
					if(err){
					
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}else{
						console.log(result);
						res.send({success:true,jobs:result});
					}
					
		})
	})
		
}
