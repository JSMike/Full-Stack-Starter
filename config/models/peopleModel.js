var mongoose = require("mongoose");

var PeopleSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('People', PeopleSchema);
