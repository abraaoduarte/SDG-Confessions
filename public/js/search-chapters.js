"use strict";

$(function () {
  var $select_confession = $(".js-confessions");
  var $button_search = $('.js-button-search');
  var $select_chapter = $(".js-chapter-id");
  $select_confession.on('change', function () {
    var confession_id = event.currentTarget.value || null;

    if (!confession_id) {
      $select_chapter.empty();
      $select_chapter.append(new Option('Escolha uma capítulo', ''));
      $button_search.attr('disabled', true);
      return;
    }

    fetch("/admin/capitulos/search-chapter-by-confession/".concat(confession_id)).then(function (response) {
      return response.json();
    }).then(function (_ref) {
      var data = _ref.data;
      data.forEach(function (chapter) {
        $select_chapter.append(new Option(chapter[0], chapter[1]));
      });
    }).catch(function (error) {
      console.log('error: ', error);
    });
  });
  $select_chapter.on('change', function () {
    var chapter_id = event.currentTarget.value;

    if (chapter_id) {
      $button_search.attr('disabled', false);
      return;
    }

    $button_search.attr('disabled', true);
  });
});