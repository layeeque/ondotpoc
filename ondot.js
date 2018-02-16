const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const restService = express();

var firstname = ""
var lastname = ""
var dob = ""
var ssn = ""


restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());
restService.post('/echo', function (req, res) {
    console.log("I am in rest service")
    if (req.body.result.action == "confirmation") {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "ondot"
        });
        firstname = req.body.result && req.body.result.parameters && req.body.result.parameters.firstname ? req.body.result.parameters.firstname : "Seems like some problem. Speak again."
        lastname = req.body.result && req.body.result.parameters && req.body.result.parameters.lastname ? req.body.result.parameters.lastname : "Seems like some problem. Speak again."
        dob = req.body.result && req.body.result.parameters && req.body.result.parameters.date ? req.body.result.parameters.date : "Seems like some problem. Speak again."
        ssn = req.body.result && req.body.result.parameters && req.body.result.parameters.number ? req.body.result.parameters.number : "Seems like some problem. Speak again."

        console.log("firstname is " + firstname)
        console.log("lastname is " + lastname)
        console.log("dob is " + dob)
        console.log("ssn is " + ssn)
        con.connect(function (err) {

            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO `ondot`.`customer` (`first`, `last`, `dob`, `ssn`) VALUES ('" + firstname + "', '" + lastname + "', '" + dob + "', '" + ssn + "');";
            con.query(sql, function (err, result) {
                con.end()
                if (err) throw err;

                return res.json({
                    speech: "successfully done",
                    displayText: "successfully done",
                    source: 'webhook-echo-sample',
                });
            })
        })
    }
})
restService.listen((process.env.PORT || 8000), function () {
    console.log("Server up and listening urweyruwery")

});