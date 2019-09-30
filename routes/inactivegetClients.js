const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/inactivegetClients/`;
	
	app.post(baseUrl, verify.verifyAdminToken ,function(req,res){

		var sql = 'select ct_name from client where ct_end_date != "9999-12-31";';
		req.db.query(sql,function(err,result){
			if(err){
				console.log(err);
			}
			console.log(result)
			res.send({success:true,inactiveclients:result});
		})

})
}
