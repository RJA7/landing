const ProjectModel = require(`../models/project`);
const async = require(`async`);

exports.get = function (req, res, next) {
  const lang = req.session.user.lang;

  ProjectModel
    .aggregate([
      {
        $project: {
          _id     : 1,
          name    : `$${lang}.name`,
          category: `$${lang}.category`,
          image   : 1
        }
      }
    ])
    .exec((err, sections) => {
      if (err) {
        return next(err);
      }

      res.status(200).send(sections);
    });
};

exports.patch = (req, res, next) => {
  const lang = req.session.user.lang;
  const id = req.params.id;
  const body = req.body;

  async.waterfall([

    cb => ProjectModel.findById(id, cb),

    (project, cb) => project ? cb(null, project) : cb(new Error(`Not found`)),

    (project, cb) => {
      project[lang].name = body.name || project[lang].name;
      project[lang].category = body.category || project[lang].category;
      project.save(cb);
    },

    project => res.status(200).send(project.toObject())
  ], next);
};
