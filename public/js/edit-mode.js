;(function () {
  var query = window.location.href.split('?')[1];

  if (!query || query.indexOf('edit') === -1) return;

  var queryObj = {};
  var pairs = query.split('&');

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    queryObj[pair[0]] = pair[1];
  }

  $('.portfolio-box,.btn').click(function (e) {
    e.preventDefault();
  });

  function updateSection($target, field, message) {
    var sectionName = $target.closest('.section').data('name');
    var newText = prompt('Enter new ' + (message || field), $target.text());

    $target.text(newText);

    var data = {};
    data[field] = newText;

    $.ajax({
      headers: {"X-Edit-Header": String(queryObj.edit)},
      type   : 'patch',
      url    : 'sections/' + sectionName,
      data   : data
    });
  }

  $('.section-title').click(function (e) {
    updateSection($(e.target), 'title');
  });

  $('.section-description').click(function (e) {
    updateSection($(e.target), 'description');
  });

  $('.section-button').click(function (e) {
    updateSection($(e.target), 'buttonText', 'button text');
  });


  function updateProject($target, field) {
    var id = $target.closest('.project-item').data('id');
    var newText = prompt('Enter new project ' + field, $target.text());

    $target.text(newText);

    var data = {};
    data[field] = newText;

    $.ajax({
      headers: {"X-Edit-Header": String(queryObj.edit)},
      type   : 'patch',
      url    : 'projects/' + id,
      data   : data
    });
  }

  $('#projectsList')
    .on('click', '.project-category', function (e) {
      updateProject($(e.target), 'category');
    })
    .on('click', '.project-name', function (e) {
      updateProject($(e.target), 'name');
    });


  function updateService($target, field) {
    var id = $target.closest('.service-item').data('id');
    var newText = prompt('Enter new service ' + field, $target.text());

    $target.text(newText);

    var data = {};
    data[field] = newText;

    $.ajax({
      headers: {"X-Edit-Header": String(queryObj.edit)},
      type   : 'patch',
      url    : 'services/' + id,
      data   : data
    });
  }

  $('#servicesList')
    .on('click', '.service-name', function (e) {
      updateService($(e.target), 'name');
    })
    .on('click', '.service-description', function (e) {
      updateService($(e.target), 'description');
    });
}());
