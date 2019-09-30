const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getAdminDashboardDetails`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
	//	console.log(req);
		var sql = `select userjobs.jobid, jobs.client, user.Fname, jobs.worker, userjobs.date ,userjobs.start_time, userjobs.end_time ,jobs.shift_type  from  userjobs,jobs,user  where jobs.jobid = userjobs.jobid and user.userid = userjobs.userid and  userjobs.date = "${req.body.Data}";`

		req.db.query(sql,function(err,result){
			if(err){
				console.log(err)
				res.send({success:false,msg:'Issue with Database'});
			}else{
				console.log(result);
				res.send({success:true,rows:result})
			}
		})
	})
}


