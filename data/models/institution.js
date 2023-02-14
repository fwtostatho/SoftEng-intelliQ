const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InstitutionSchema = new Schema({
    name: {
      type: String,
      required: true
    } }, {
      versionKey: false
  });
  const Institution = mongoose.model('Institution', InstitutionSchema);
  module.exports = Institution;