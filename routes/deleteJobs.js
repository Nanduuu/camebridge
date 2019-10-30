
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');
const emailTrasporter = require('../lib/emailTransporter');
const email = require('../lib/email');
var transporter =  emailTrasporter.emailTransporter;

let infoEmail = (jobid,db)=>{
	
	let myPromise = new Promise(function(resolve, reject){
			console.log(jobid.join(','));
	
			db.query(`select * from jobs where jobid in ( ${jobid.join(',')});`,function(err, result){
				
				if(err){
					console.log(err)
					reject(err)
				}else{
					console.log(result);
					var info = [];
					for(let i = 0; i <= result.length -1; i++){

						infoset = {
								hospital : result[0].client,
						 		date : result[0].date,
						 		from_time : result[0].start_time,
								to_time  : result[0].end_time,
							}
							info.push(infoset)
					}
					console.log(info);
					db.query(`select Emailid from user where userid in ( select userid from userjobs where jobid in ( ${jobid.join(',')}));`,function(err,result){
					//	console.log(result);
						console.log(err)
						
						let list = '';
						for(let i = 0; i <= result.length -1; i++){
							if(i == 0){
								list = result[i].Emailid;
							}else{
							list = list.concat(', ' , result[i].Emailid)
							}
						}
						//console.log(list);
						//console.log(info);
						let emailData = {
							info,
							toList : list,
							msg : 'Below listed jobs are cancelled',
						}
						console.log(emailData);
						email.sendEmail(emailData);
						resolve(true);
					})
					
				}
			})
		})

	return myPromise;
}


module.exports.setRouter = (app)=>{
	let baseUrl = appConfig.apiVersion + '/deleteJobs'
	app.post(baseUrl, verify.verifyAdminToken, function(req,res){

				infoEmail(req.body.Data, req.db)
				.then( function(result){
					var sql = 'delete from jobs where (jobid) in ("' + req.body.Data.join('","') + '");';
					req.db.query(sql,function(err,result){
						console.log(result)
						if(err){
						
							res.send({success:false,message:"Please enter proper Job ids"});
						}else{


							req.db.query('delete from userjobs where (jobid) in ("' + req.body.Data.join('","') + '");' , function(err,result){

								console.log(result);
								res.send({success:true,message:result});
							})
							
						}
					})
				} )
				.catch(function(err){
					res.send({success:false,message:err});
				});

					

				
			})
	
}