
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getShiftDetails/`;
	app.post(baseUrl, verify.verifyAdminToken,function(req,res){
		var clientId;
		let sql_ct_id = 'SELECT ct_id from client where ct_name ="' + req.body.Data + '";';
		

		req.db.query(sql_ct_id,function(err,result){

			if(err){
				console.log(err);
				res.send({success:false,msg:"Issue with database"});
			}else{
				clientId = result[0].ct_id;
				var sql = `select * from shifts where ct_id = ${clientId};`
				req.db.query(sql,function(err,result){
						if(err){
							console.log(err);
							res.send({success:false,msg:"Issue with database"})
						}else{
							console.log(result);
							res.send({success:true,shiftDetails:result});
						}
				})
			}
		})
	})
}


