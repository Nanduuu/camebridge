const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/updateEditClient/`;
	
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
		
		var input = {
			ct_name : req.body.Data.ct_name,
			ct_street_number : req.body.Data.ct_street_number,
			ct_street_name : req.body.Data.ct_street_name,
			ct_city_name : req.body.Data.ct_city_name,
			ct_pincode : req.body.Data.ct_pincode,
			ct_invoice_prefix : req.body.Data.ct_invoice_prefix,
		}
		var sql = 'update client SET ? where ct_id = "'+ req.body.Data.ct_id +'";';
		req.db.query(sql,input,function(err,result){
			console.log(result)
			if(err){
				console.log(err)
				res.send({success:false,msg:"Issue with database"});
			}else{
				res.send({success:true,msg:"Client Updated successfully"});
			}
		})
	})
}

