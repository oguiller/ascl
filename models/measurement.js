var mongoose = require('mongoose');
// (id, date, year, month, day, hour, value
var Schema = mongoose.Schema;

var MeasurementSchema = new Schema({
    dateId: {type: Number}
    , deviceName: {type: String}
    , date: {type : Date, default: Date.now }
    , year: {type: Number, default: 0}
    , month: {type: Number, default: 0}
    , day: {type: Number, default: 0}
    , hour: {type: Number, default: 0}
    , value: {type: Number, default: 0}
});

module.exports = mongoose.model('Measurement', MeasurementSchema);