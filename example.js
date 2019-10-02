const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const md5 = require('md5');
console.log(md5('admin'))

app.get('/split/name', (req, res) => {
    var par = req.query;
   var output = par.fullName.split(' ');

   res.send({
       firstName : output[1],
       lastName :output[1]
   })
});// end split name

app.get('/calculate/age', (req, res) => {
    var par = req.query;
    var today = new Date();
    var birthDate = new Date(par.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    res.send({
        age :age
    });


});// end calculate age



app.listen(3000);