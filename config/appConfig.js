let appConfig = {};

appConfig.port = 5000;
appConfig.allowedCorsOrigin ="*";
appConfig.env = "dev";
appConfig.db={
    url:'mongodb+srv://admin:admin@akhil-2lnnc.mongodb.net/thadepalligudem?retryWrites=true&w=majority',
}
appConfig.apiVersion = '/api';
appConfig.jwtSecretCode = 'nandakumar';
appConfig.serverIP = '';

module.exports={
    port:appConfig.port,
    allowedCorsOrigin : appConfig.allowedCorsOrigin,
    env : appConfig.env,
    db : appConfig.db,
    apiVersion : appConfig.apiVersion,
    jwtSecretCode : appConfig.jwtSecretCode,
    serverIP : appConfig.serverIP,
} // end of module export