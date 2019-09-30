const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');

let verifyAdminToken = (req, res, next) => {
 //   console.log('in token verification')
    var authToken = req.headers.authorization;
  //  console.log(authToken);
   if (authToken != undefined || authToken != null){
     //   console.log('in true')
        var token = authToken.split(' ');
        jwt.verify(token[1], config.jwtSecretCode, function(err, decoded) {
            if(err){
                console.log(err)
                res.send (404)
            }else{
                if(decoded.Role == 'admin'){
                  //  console.log(decode)
                    req.userDetails = decoded;
                    next();
                }else{
                    res.sendStatus(403)
                }
            }
        })
    }else{
        console.log('in verification error')
        res.sendStatus(403)
    }
}

let verifyStaffToken = (req, res, next) => {
  //  console.log('in token verification')
    var authToken = req.headers.authorization;
  //  console.log(authToken);
    if (authToken != undefined || authToken != null){
     //   console.log('in true')
        var token = authToken.split(' ');
        jwt.verify(token[1], config.jwtSecretCode, function(err, decoded) {
            if(err){
                console.log(err)
                res.send (404)
            }else{
             //   console.log(decoded)
                if(decoded.Role == 'staff'){
                    req.userDetails = decoded;
                   
                    next();
                }else{
                    res.sendStatus(403)
                }
            }
        })
    }else{
        res.sendStatus(403)
    }
}

module.exports = {
    verifyAdminToken,
    verifyStaffToken,
}