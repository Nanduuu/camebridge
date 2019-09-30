
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/enableDisableUser`;
	app.post( baseUrl, verify.verifyAdminToken , function(req,res){
				
		var current_date = new Date(req.body.Data.end_date);
		var end_date = new Date('2038-01-18');

		var data = {};
		console.log(current_date);
		console.log(end_date)

		if (current_date < end_date){
			data.end_date = new Date('2038-01-19');
		}else{
			data.end_date = new Date( );
		}
		
		console.log(current_date);
		console.log(data)
		let sql_updateUserDetails = `UPDATE user  SET ? where Userid = ${req.body.Data.Userid};`;
	
		req.db.query(sql_updateUserDetails, data,function(err,result){
			console.log(err);

			if(err){
				console.log(err)
				res.send({success:false,msg:"Issue with database"});
			}else{
	//						console.log(result);
							res.send({success:true,msg:"Successfully updated"});
						}
				})
			}

	)
}


