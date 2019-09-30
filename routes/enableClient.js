const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/enableClient/`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
		console.log("client enable")
			
				var sql = 'update client SET ct_end_date ="9999-12-31" where ct_name ="' + req.body.Data +'";';
				req.db.query(sql,function(err,result){
					if(err){
						console.log(err);
					}
					console.log(result)
					res.send({success:true,msg:"Client enabled"});
				})
	})
}


