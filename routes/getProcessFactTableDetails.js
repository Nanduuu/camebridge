const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getProcessFactTableDetails/`;
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){
	//	console.log(req)
		if(req.body.client){
	//		console.log('in user fact table')
			var sql_factTable = `SELECT * from facttable left join jobs on jobs.jobid = facttable.jobid left join user on facttable.userid = user.userid where facttable.date >="${req.body.startDate}" and facttable.date <= "${req.body.endDate}" and jobs.client = "${req.body.client}";`;
	//		console.log(sql_factTable);
		}
		req.db.query(sql_factTable,function(err,result){ 
			if(err){
				console.log(err)
				res.send({success:false,msg:"Issue with database"});
			}else{
//						console.log(result);
						res.send({success:true,factTable:result});
			}

		})
	})
}


