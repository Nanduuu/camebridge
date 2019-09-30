const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');


module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/updateUserDetails/`;
	//console.log(appConfig);
	app.post( baseUrl, function(req,res){

				  var data = {
						  Emailid : req.body.Email,
						  Fname : req.body.Fname,
						  Lname : req.body.Lname,
						  Tel :req.body.Tel,
						  start_date: new Date(),
						  end_date: new Date('2038-01-19'),
					  }
					  
				  req.db.query(`update user set ? where userid = "${req.body.userid}"`, data ,function(err,result){
					  if(err){
						  console.log(err)
						  res.send({success:false,msg:'Issue at conncting database'});
					  }else{
						  res.send({success:true,msg:'Details Updated'})
						 
					  }
				  })
				
			  })
}
