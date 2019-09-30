
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/deleteStaffJobs/`;

	app.post( baseUrl, verify.verifyStaffToken ,function(req,res){

						let source_data = req.body.Data.jobs;
						let data = [];

						source_data.map(function(row){
							temp = {};
							temp.jobid = row;
							temp.userid = req.body.Data.userid;
							data.push(temp)
						})
						let count = data.length;

						for(let i = 0; i < count ; i++){

							let delete_sql = `delete from userjobs where jobid = ${data[i].jobid} and userid = ${data[i].userid};`;

							req.db.query(delete_sql, function(err,result){
								if(err){
									console.log(err);
									flag = false;
								}
							})
						}

						for(let i = 0; i < count ; i++){

							let count_sql= `update jobs set filled = filled-1 where jobid = "${data[i].jobid}";`
							req.db.query(count_sql, function(err,result){
								if(err){

									console.log(err)
									flag = false;
								}
							}) 

						}	
						res.send({success:true})
					})
			

}



