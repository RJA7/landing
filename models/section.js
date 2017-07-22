const constants = require(`../constants`);
const LANGUAGES = constants.LANGUAGES;
const mongoose = require(`mongoose`);
const uuid = require(`uuid/v4`);
const Schema = mongoose.Schema;

const options = {
  _id        : {type: String, unique: true, default: uuid},
  sectionName: {type: String, required: true, unique: true}
};

for (let i = 0; i < LANGUAGES.length; i++) {
  options[LANGUAGES[i]] = {};
  options[LANGUAGES[i]].name = {type: String, required: true};
  options[LANGUAGES[i]].title = {type: String, required: true};
  options[LANGUAGES[i]].description = String;
  options[LANGUAGES[i]].buttonText = String;
}

const sectionSchema = new Schema(options);
const SectionModel = mongoose.model(`section`, sectionSchema);

module.exports = SectionModel;
