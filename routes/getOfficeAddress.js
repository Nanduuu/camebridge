
const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/getOfficeAddress`;
	app.post( baseUrl, verify.verifyAdminToken, function(req,res){

					  req.db.query('select * from officeaddress;', function(err,result){
						  if(err){
							  console.log(err);
						  }else{
							  console.log(result)
							  res.send({success:true,data:result[0]})
							 
						  }
					  })
			})
}

