const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/activegetClients/`
	app.post(baseUrl,  verify.verifyAdminToken ,function(req,res){
		console.log("active")
			
				var sql = 'select ct_name from client where ct_end_date = "9999-12-31";';
				req.db.query(sql,function(err,result){
					console.log(result)

					res.send({success:true,activeclients:result});
				})
	})
}; 