const SectionModel = require(`../models/section`);
const async = require(`async`);

exports.get = function (req, res, next) {
  const lang = req.session.user.lang;

  async.waterfall([

    cb => SectionModel
      .aggregate([
        {
          $project: {
            _id        : 1,
            name       : `$${lang}.name`,
            title      : `$${lang}.title`,
            description: `$${lang}.description`,
            buttonText : `$${lang}.buttonText`,
            sectionName: 1
          }
        }
      ])
      .exec(cb),

    sections => res.status(200).send(sections)
  ], next);
};

exports.patch = (req, res, next) => {
  const lang = req.session.user.lang;
  const sectionName = req.params.sectionName;
  const body = req.body;

  async.waterfall([

    cb => SectionModel.findOne({sectionName}, cb),

    (section, cb) => section ? cb(null, section) : cb(new Error(`Not found`)),

    (section, cb) => {
      section[lang].title = body.title || section[lang].title;
      section[lang].description = body.description || section[lang].description;
      section[lang].buttonText = body.buttonText || section[lang].buttonText;
      section.save(cb);
    },

    section => res.status(200).send(section.toObject())
  ], next);
};
