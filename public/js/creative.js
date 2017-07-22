;(function () {

  function onReady(appData) {
    var services = appData.services;
    var projects = appData.projects;
    var sections = appData.sections;
    var serviceHtml = appData['templates/service.html'];
    var compiledService = _.template(serviceHtml);
    var $servicesList = $('#servicesList');
    var projectHtml = appData['templates/project.html'];
    var compiledProject = _.template(projectHtml);
    var $projectsList = $('#projectsList');
    var $section;
    var section;
    var i;

    $('nav a:first').html(sections[0].name);
    $('#navbarExample').find('a').each(function (index, el) {
      $(el).html(sections[index + 1].name);
    });

    for (i = 0; i < sections.length; i++) {
      section = sections[i];
      $section = $("[data-name='" + section.sectionName + "']");
      $section.find('.section-title').html(section.title);
      $section.find('.section-description').html(section.description);
      $section.find('.section-button').html(section.buttonText);
    }

    $servicesList.html('');
    for (i = 0; i < services.length; i++) {
      $servicesList.append(compiledService(services[i]));
    }

    $projectsList.html('');
    for (i = 0; i < projects.length; i++) {
      $projectsList.append(compiledProject(projects[i]));
    }
  }

  // preload
  function preload() {
    var appData = {};
    var htmlIsReady = false;
    var urls = ['sections', 'services', 'projects', 'templates/project.html', 'templates/service.html'];

    function checkReadiness() {
      htmlIsReady && Object.keys(appData).length === urls.length && onReady(appData);
    }

    $(document).ready(function () {
      htmlIsReady = true;
      checkReadiness();
    });

    for (var i = 0; i < urls.length; i++) {
      $.ajax({
        url: urls[i],

        success: (function (i, data) {
          appData[urls[i]] = data;
          checkReadiness();
        }).bind(this, i),

        error: function (err) {
          console.log(err);
        }
      })
    }
  }

  var $lang = $('#lang');
  var $curLang = $lang.find('span:first');
  var localStorage;
  localStorage = localStorage || {};
  var lang = localStorage.lang;

  function init() {
    $.ajax({
      url : 'user',
      data: {lang: lang},

      success: function (user) {
        lang = user.lang;
        $curLang.html(lang);

        $lang.find('ul').one('click', 'li', function (e) {
          var newLang = $(e.currentTarget).children('a').html();

          if (lang !== newLang) {
            lang = localStorage.lang = newLang;
            $curLang.html(lang);
            init();
          }
        });

        preload();
      }
    });
  }

  init();
}());
