const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/staffgetJobDetails/`;
	app.post(baseUrl, verify.verifyStaffToken,function(req,res){
	
				let curr_date = new Date().toISOString();
				//var sql = `select * from jobs left join shifts on jobs.shift_id = shifts.shift_id where date >= "${req.body.Data.from_date}" and date <= "${req.body.Data.to_date}" and jobs.shift_id = shifts.shift_id ;`
				var sql = `select * from jobs where date >= "${curr_date}" and date <= "${req.body.Data.to_date}"  and worker = "${req.body.Data.stafftype}";`
				req.db.query(sql,function(err,result){
					//console.log(sql)
					if(err){
						console.log(err);
		
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}else{

			//			console.log(result);
	
						res.send({success:true,jobs:result});
					}
					
				})
			})
	

}


