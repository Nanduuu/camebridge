const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.baseUrl}/getEditJob`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
	
	
				var sql = `select * from jobs where jobid = ${req.Data.jobid};`
				req.db.query(sql,function(err,result){
					console.log(result);
					if(err){
						res.send({success:false,msg:"Please enter the jobid"});
					}else{
						res.send({success:true,job:result});
					}
				})
			}
		
	)
}; 