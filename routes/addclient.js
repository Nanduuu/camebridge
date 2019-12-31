const appConfig = require('../config/appConfig');
const verify = require('../lib/verifyToken');

module.exports.setRouter = (app)=>{
	let baseUrl = `${appConfig.apiVersion}/addclient/`
	app.post( baseUrl,  verify.verifyAdminToken, function(req,res){

	     				  let data  = {
							  'ct_id' : null,
							  'ct_name' : req.body.Data.ct_name,
							  'ct_street_number' : req.body.Data.ct_street_number,
							  'ct_street_name' : req.body.Data.ct_street_name,
							  'ct_city_name':req.body.Data.ct_city_name,
							  'ct_pincode' : req.body.Data.ct_pin,
							  'ct_invoice_prefix' : req.body.Data.ct_invoice_prefix,
							  'ct_start_date': new Date(),
							  'ct_end_date':"9999-12-31",
							  'ct_invoice_number': '00000',
						  }
						  let sql_getid = 'SELECT MAX(ct_id) as MAX from client;';
						  
						  var sql = 'INSERT INTO client SET ?';

						  req.db.query(sql_getid, function(err,result){
							  
							  if(err){
								  console.log(err);
								  console.log(result);
							  }

							  if(result[0].MAX == null){
								  data.ct_id = 1;
							  } else {				
								  data.ct_id = result[0].MAX + 1;					  			
							  }

							  req.db.query(sql, data, function(err,results){
									  if(err){ 
											  console.log(err);
											  if(err.code === 'ER_DUP_ENTRY'){
												  con.end();
												  res.send({success:false, msg:"Client and Branch cannot be duplicate"});
											  }else{
												  
												  res.send({success:false, msg:"Issue with database"});
											  }
										  }else {
											  //console.log(rows);
										
											  res.send({success:true,msg:"Client Added Successfully"});
											  
										}
									});
						  
						  })
						  
						})
}