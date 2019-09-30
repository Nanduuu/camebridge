const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/StaffConfirmJob/`;
	app.post(baseUrl, verify.verifyStaffToken ,function(req,res){
		let data  = {
						  'jobid' : req.body.Data.JobID,
						  'userid': req.body.Data.UserId, 
						  'start_time' : new Date( req.body.Data.start_time),
						  'end_time' : new Date( req.body.Data.end_time),
						  'date' : new Date(req.body.Data.Date),
				 }
		
			var check_availability = `select * from jobs where filled = count and jobid = "${req.body.Data.JobID}";`

			req.db.query(check_availability, function(err,result){

					if (err ){
						
						console.log(err);											
					}
				
					if(result.length > 0){ 
						console.log(result);
								
						res.send({success:false,msg:"No availability"}); 
						flag = false;
					}else{
							var sql_dup = 'select * from userjobs where jobid = "' + req.body.Data.JobID +'" and userid = "' + req.body.Data.UserId + '";'

							  var sql_conflict = `select * from userjobs  where end_time >= "${req.body.Data.start_time}" and end_time <= "${req.body.Data.end_time}" and userid = ${req.body.Data.UserId} ;`// "${req.body.Data.end_time}";`
					
							req.db.query( sql_conflict,function(err,result){
			
								if( result.length !== 0 ){ 
										
									res.send({success:false,msg:"Time Conflict"});

								}else{

									req.db.query(sql_dup, function(err,result){
										if (result.length !== 0){ 
												
												res.send({success:false,msg:"User alreday enrolled to this job"});
										}else{

											var sqlInsertJob = `INSERT INTO userjobs SET ? ;`;

											req.db.query(sqlInsertJob,data,function(err,result){ 
												console.log("In Insert query")
												
												if (err){
													
													console.log(err)
													req.db.query('ROLLBACK',function(err,result){

													});

													res.send({success:false,msg:"Database error"});
												}else{
													
													req.db.query(`update jobs set filled = filled+1 where jobid = "${req.body.Data.JobID}";`,function(err,result){

													})
													req.db.query('commit', function(err,result){

													});

													res.send({success:true,msg:"Enrolled Successfully"});
												}
						})
					}
				})
			}
			
	})
}
})


});

}



					





