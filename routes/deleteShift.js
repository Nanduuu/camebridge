
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/deleteShift/`;
	app.post(baseUrl, verify.verifyAdminToken ,function(req,res){
		var data = req.body;
//		console.log('delete shift')
		var sql = `delete from shifts where shift_id = "${data.shift_id}" and ct_id = "${data.ct_id}";`
		req.db.query(sql,function(err,result){
			if(err){
				console.log(err)
				res.send( {seccess:false,msg:"Failed to delete shift" });
			}else{
				req.db.query('commit',function(err,result){
					if(err){
						console.log(err)
					}
					res.send({success:true,msg:"Deleted Successfully"});
				})
			}
		})
	})
}


