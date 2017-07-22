const logger = require(`./getLogger`)(module);
const SectionModel = require('../models/section');
const ServiceModel = require(`../models/service`);
const ProjectModel = require(`../models/project`);
const async = require(`async`);

module.exports.fillDb = mainCb => {
  async.each([SectionModel, ServiceModel, ProjectModel], (model, eachCb) => model.remove({}, eachCb), () => {

    async.waterfall([

      // sections
      cb => {
        const data = [
          {
            sectionName: `header`,

            Eng: {
              name       : `START BOOTSTRAP`,
              title      : `YOUR FAVORITE SOURCE OF FREE BOOTSTRAP THEMES`,
              description: `Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!`,
              buttonText : `FIND OUT MORE`
            },

            Ukr: {
              name       : `ГОЛОВНА`,
              title      : `ТВІЙ КРАЩИЙ РЕСУРС БЕЗКОШТОВНИХ ТЕМ`,
              description: `Просто завантаж`,
              buttonText : `БІЛЬШЕ`
            }
          },

          {
            sectionName: `about`,

            Eng: {
              name       : `ABOUT`,
              title      : `We've got what you need!`,
              description: `Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!`,
              buttonText : `GET STARTED!`
            },

            Ukr: {
              name       : `ПРО НАС`,
              title      : `У нас те, що потрібно тобі`,
              description: `Усі темплейти у відкритому доступі`,
              buttonText : `РОЗПОЧАТИ!`
            }
          },

          {
            sectionName: `services`,

            Eng: {
              name       : `SERVICES`,
              title      : `At Your Service`,
              description: ``,
              buttonText : ``
            },

            Ukr: {
              name       : `СЕРВІС`,
              title      : `Раді Бути Корисними`,
              description: `Ф`,
              buttonText : `Ф`
            }
          },

          {
            sectionName: `portfolio`,

            Eng: {
              name       : `PORTFOLIO`,
              title      : `Free Download at Start Bootstrap!`,
              description: ``,
              buttonText : `DOWNLOAD NOW`
            },

            Ukr: {
              name       : `Портфоліо`,
              title      : `Завантаж безкоштовно та розпочни`,
              description: `Ф`,
              buttonText : `ЗАВАНТАЖИТИ ЗАРАЗ`
            }
          },

          {
            sectionName: `contact`,

            Eng: {
              name       : `CONTACT`,
              title      : `Let's Get In Touch!`,
              description: `Ready to start your next project with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!`,
              buttonText : ``
            },

            Ukr: {
              name       : `КОНТАКТИ`,
              title      : `Всього один клік!`,
              description: `Готовий розпочати наступний проект з нами?`,
              buttonText : `Ф`
            }
          }
        ];

        async.each(data, (item, eachCb) => SectionModel.create(item, eachCb), cb);
      },

      // services
      cb => {
        const data = [
          {
            iconClass: `fa-diamond`,

            Eng: {
              name       : `Sturdy Templates`,
              description: `Our templates are updated regularly so they don't break.`
            },

            Ukr: {
              name       : `Шаблон Sturdy`,
              description: `Постійні оновлення`
            }
          },

          {
            iconClass: `fa-paper-plane`,

            Eng: {
              name       : `Ready to Ship`,
              description: `You can use this theme as is, or you can make changes!`
            },

            Ukr: {
              name       : `Готовий для роботи`,
              description: `Можеш використовувати ці теми як є, або редагувати на свій смак!`
            }
          },

          {
            iconClass: `fa-newspaper-o`,

            Eng: {
              name       : `Up to Date`,
              description: `We update dependencies to keep things fresh.`
            },

            Ukr: {
              name       : `Завжди найновіше`,
              description: `Ми оновлюємо залежності, щоб все виглядало свіжим.`
            }
          },

          {
            iconClass: `fa-heart`,

            Eng: {
              name       : `Made with Love`,
              description: `You have to make your websites with love these days!`
            },

            Ukr: {
              name       : `З любов'ю`,
              description: `Ти повинен створювати веб сайти з любов'ю!`
            }
          }
        ];

        async.each(data, (item, eachCb) => ServiceModel.create(item, eachCb), cb);
      },

      // projects
      cb => {
        const data = [
          {
            image: `img/portfolio/thumbnails/1.jpg`,

            Eng: {
              name    : `Super Cn`,
              category: `GAMES`
            },

            Ukr: {
              name    : `Супер Сн`,
              category: `ІГРИ`
            }
          },

          {
            image: `img/portfolio/thumbnails/2.jpg`,

            Eng: {
              name    : `Art`,
              category: `GRAPHICS`
            },

            Ukr: {
              name    : `Арт`,
              category: `ГРАФІКА`
            }
          },

          {
            image: `img/portfolio/thumbnails/3.jpg`,

            Eng: {
              name    : `HBO`,
              category: `TV`
            },

            Ukr: {
              name    : `HBO`,
              category: `ШОУ`
            }
          },

          {
            image: `img/portfolio/thumbnails/4.jpg`,

            Eng: {
              name    : `One More Light`,
              category: `MUSIC`
            },

            Ukr: {
              name    : `One More Light`,
              category: `МУЗИКА`
            }
          },

          {
            image: `img/portfolio/thumbnails/5.jpg`,

            Eng: {
              name    : `Love`,
              category: `RELATIONSHIPS`
            },

            Ukr: {
              name    : `Суп`,
              category: `Відносини`
            }
          },

          {
            image: `img/portfolio/thumbnails/6.jpg`,

            Eng: {
              name    : `Project Name`,
              category: `CATEGORY`
            },

            Ukr: {
              name    : `Назва проекту`,
              category: `КАТЕГОРІЯ`
            }
          }
        ];

        async.each(data, (item, eachCb) => ProjectModel.create(item, eachCb), cb);
      }
    ], err => {
      if (err) {
        logger.error(err);
      }

      mainCb();
    });
  });
};
