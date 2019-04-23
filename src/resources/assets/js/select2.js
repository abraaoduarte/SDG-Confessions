export default function select2(selector, options) {
  options = options || {};
  options = Object.assign({
    allowClear: true,
    placeholder: 'Escolha...',
    language: 'pt-BR',
    ajax: options.data ? undefined : {
      url: options.url || (options.ajax ? options.ajax.url : ''),
      dataType: 'json',
      delay: 250,

      data: function data(params) {
        return {
          q: params.term,
          page: params.page
        };
      },

      processResults: function processResults(result, params) {
        params.page = params.page || 1;

        return {
          results: result.data.filter(options.filter || Boolean),
          pagination: {
            more: params.page * result.per_page < result.total
          }
        };
      },
      cache: true
    },
    escapeMarkup: function escapeMarkup(markup) {
      return markup;
    },
    minimumInputLength: 1,
    templateSelection: (obj) => {
      if (options.label && obj[options.label]) {
        return obj[options.label];
      }
      return obj.text;
    },
    templateResult: (obj) => {
      if (obj.loading) {
        return obj.text;
      };

      if (options.label && obj[options.label]) {
        return obj[options.label];
      }

      return obj.text;
    },
  }, options);

  return $(selector).select2(options);
}
