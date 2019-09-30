const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/deleteClient/`
	app.post(baseUrl, verify.verifyAdminToken ,function(req,res){
		
			//	console.log(req.body.Data);
				//var sql = `delete from client where (ct_branch) in (${req.body.Data}) ;`
				var sql = 'delete from client where (ct_branch) in ("' + req.body.Data.join('","') + '");';
				console.log(sql)
				req.db.query(sql,function(err,result){
					//console.log(result)
					if(err){
						
						res.send({success:false,message:"Please enter proper Job ids"});
					}else{
				
						//console.log(result);
						res.send({success:true,message:result});
					}
				})
			})
}; 