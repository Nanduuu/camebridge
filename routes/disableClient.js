const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/disableClient/`;
	app.post( baseUrl, verify.verifyAdminToken ,function(req,res){
		console.log("client disbale")
		var sql = 'update client SET ct_end_date ="'+ new Date().toISOString().slice(0,10) + '" where ct_name ="' + req.body.Data +'";';
		req.db.query(sql,function(err,result){
			if(err){
				console.log(err);
				res.send({success:false,msg:"Error at database"});
			}else{
				console.log(result)
				res.send({success:true,msg:"Client disabled"});
			}
		})
	})
};  