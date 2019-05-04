"use strict";

$(function () {
  const $select_confession = $(".js-confessions");
  const $button_search = $('.js-button-search');
  let $select_chapter = $(".js-chapter-id");

  $select_confession.on('change', function () {
    const confession_id = event.currentTarget.value || null;

    if (!confession_id) {
      $select_chapter.empty()
      $select_chapter.append(new Option('Escolha uma capítulo', ''));
      $button_search.attr('disabled', true);
      return;
    }
    fetch(`/admin/capitulos/search-chapter-by-confession/${confession_id}`)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      data.forEach((chapter) => {
        $select_chapter.append(new Option(chapter[0], chapter[1]));
      });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  });

  $select_chapter.on('change', function () {
    const chapter_id = event.currentTarget.value;

    if (chapter_id) {
      $button_search.attr('disabled', false);

      return;
    }

    $button_search.attr('disabled', true);

  });
});