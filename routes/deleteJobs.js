
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = appConfig.apiVersion + '/deleteJobs'
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){

				//console.log(req.body);
				var sql = 'delete from jobs where (jobid) in ("' + req.body.Data.join('","') + '");';
				req.db.query(sql,function(err,result){
					console.log(result)
					if(err){
					
						res.send({success:false,message:"Please enter proper Job ids"});
					}else{

						req.db.query('delete from userjobs where (jobid) in ("' + req.body.Data.join('","') + '");' , function(err,result){

							console.log(result);
							res.send({success:true,message:result});
						})
						
					}
				})
			})
	
}