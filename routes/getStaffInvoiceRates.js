
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getStaffInvoiceRates/`;
	app.post(baseUrl, verify.verifyAdminToken , function(req,res){
		console.log("active")
			
				var sql = 'select * from staffinvoice;';
				req.db.query(sql,function(err,result){
		//			console.log(result)
					if(err){
						res.send({success:false,msg:'Error with database'});
					}

					res.send({success:true,staffInvoiceRates:result});
				})
	})
}


