
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.baseUrl}/getJob`
	app.post( baseUrl, verify.verifyAdminToken ,function(req,res){
	
				var sql = `select * from jobs where jobid = "${req.body.Data}" and active = "Y";`
				req.db.query(sql,function(err,result){
					console.log(sql)
					if(err){
					//	con.end();
						res.send({success:false,message:"Job ID does not exits"});
					}else{
//						console.log(result);
						res.send({success:true,job:result});
					}
					
		})
	}) 
}