const ServiceModel = require(`../models/service`);
const async = require(`async`);

exports.get = function (req, res, next) {
  const lang = req.session.user.lang;

  ServiceModel
    .aggregate([
      {
        $project: {
          _id        : 1,
          name       : `$${lang}.name`,
          description: `$${lang}.description`,
          iconClass  : 1
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

    cb => ServiceModel.findById(id, cb),

    (service, cb) => service ? cb(null, service) : cb(new Error(`Not found`)),

    (service, cb) => {
      service[lang].name = body.name || service[lang].name;
      service[lang].description = body.description || service[lang].description;
      service.save(cb);
    },

    service => res.status(200).send(service.toObject())
  ], next);
};
