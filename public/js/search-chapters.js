"use strict";

$(function () {
  var confession_id = $("#confession_id");
  confession_id.on('change', function () {
    var id = event.currentTarget.value;
    $.ajax({
      url: "admin/paragrafos/search-chapters"
    }).done(function (chapters) {
      console.log('asdasdas');
    }).fail(function (error) {
      console.log('error', error);
    });
  });
});