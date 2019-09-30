
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/staffScheduledJobDetails//`;
	app.post(baseUrl, verify.verifyStaffToken, function(req,res){
	
		let start_date = new Date(req.body.Data.from_date).toISOString();
		let end_date = new Date (req.body.Data.to_date).toISOString();

				var sql = `select jobs.jobid , jobs.start_time, jobs.end_time, jobs.date, jobs.client from jobs LEFT JOIN  userjobs on  userjobs.jobid = jobs.jobid where userjobs.userid = "${req.body.Data.userid}" and jobs.date >= "${ start_date}" and jobs.date <= "${end_date}";`
				req.db.query(sql,function(err,result){
					if(err){
						console.log(err);
					
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}else{
						res.send({success:true,jobs:result});
					}
					
				})
			})
}


