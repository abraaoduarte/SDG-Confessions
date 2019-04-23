$(function() {
  const confession_id = $("#confession_id");

  confession_id.on('change', () => {
    const id = event.currentTarget.value;

    $.ajax({
      url: "admin/paragrafos/search-chapters",
    }).done((chapters) => {
      console.log('asdasdas');
    })
    .fail((error) => {
      console.log('error', error);
    });

  });
});