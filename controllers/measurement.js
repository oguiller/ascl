var Measurement = require('../models/measurement')
    , HttpStatus = require('http-status-codes');

Date.prototype.yyyymmddmmss = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); 
   var dd = this.getDate().toString();
   var hh = this.getHours().toString();
   var min = this.getMinutes().toString();
   var sec = this.getSeconds().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0])+hh+sec;
};

exports.addData = function (req, res) {
    var value = req.body.value
    console.log("Posting sample: " + value);
    var date = new Date();

    var measurement = new Measurement({ 
         dateId: date.yyyymmddmmss()
        , deviceName: "windie01"
        , date: date
        , year: date.getFullYear()
        , month: date.getMonth() + 1
        , day: date.getDate()
        , hour: date.getHours()
        , value: value
    });

    measurement.save(function (err) {
        if (err){
            errorHandler(err, res);
            return;
        }

        console.log('Measurement saved successfully');
        res.status(HttpStatus.OK).send({measurement: measurement});
    });
};

exports.getData = function (req, res) {
    console.log("Getting data: ");
    res.status(HttpStatus.OK).send({user: "manuel"});
};

var errorHandler = function (err, res) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({errors: [err]});
    return;
};