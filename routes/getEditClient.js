const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getEditClient/`;
	app.post(baseUrl, verify.verifyAdminToken ,function(req,res){
		console.log()
		var sql = 'select * from client where ct_name = "' +  req.body.Data +'";';
		req.db.query(sql,function(err,result){
			console.log(result)
			res.send({success:true,getEditClient:result[0]});
		})
	})
}


