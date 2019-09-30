const fs = require('fs');

const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/submitTimeSheet/`;

	app.post(baseUrl, verify.verifyStaffToken, function(req,res){
//		console.log(req.fields); 
//		console.log(req.files.ack)
		var data = req.fields;
		fs.rename(req.files.ack.path, __dirname+ '/acks/' + data.jobid + data.userid + req.files.ack.name, function(err){

			if(err){
			}else{
				var input = {
					remarks : data.remarks,
					ack_path: '/acks/' + data.jobid + data.userid + req.files.ack.name 
				}

				var sql = `update facttable set  ? where jobid = ${data.jobid} and userid = ${data.userid};`

				req.db.query(sql, input,function(err,result){
                    !err ? req.db.query('commit',function(err,result){
                        res.send({success:true,msg:"Submitted sucessfully"});
                    }) : res.send( {seccess:false,msg:"filed to upload ack" });
                })
			}

		})
		
	}

	)

}




