const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.baseUrl}/updateEditJob`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
	
					var date = new Date(req.body.Data.date);
					date.setDate(date.getDate() + 1);
					console.log(date)

					let data  = {
								'worker' : req.body.Data.staff,
					  			'client' : req.body.Data.client,
					  			'date' : date,
					  			'start_time' : req.body.Data.from_time_string,
					  			'end_time' : req.body.Data.to_time_string,
					  			'count' :req.body.Data.count,
							 }
				console.log(data);
				var sql = "update jobs SET ? where jobid = " + req.body.Data.jobid + ";" ;
				req.db.query(sql,data,function(err,result){
					console.log(result);
					if(err){
						res.send({success:false,msg:"Please submit proper details."});
					}else{
						res.send({success:true,msg:"Job has been updated."});
					}
				})
			})
}