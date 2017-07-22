const constants = require(`../constants`);
const LANGUAGES = constants.LANGUAGES;
const mongoose = require(`mongoose`);
const uuid = require(`uuid/v4`);
const Schema = mongoose.Schema;

const options = {
  _id      : {type: String, unique: true, default: uuid},
  iconClass: {type: String, required: true}
};

for (let i = 0; i < LANGUAGES.length; i++) {
  options[LANGUAGES[i]] = {};
  options[LANGUAGES[i]].name = {type: String, required: true};
  options[LANGUAGES[i]].description = {type: String, required: true};
}

const serviceSchema = new Schema(options);
const ServiceModel = mongoose.model(`service`, serviceSchema);

module.exports = ServiceModel;
