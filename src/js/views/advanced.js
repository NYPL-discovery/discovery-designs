var Advanced = (function() {
  function Advanced(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Advanced.prototype.loadListeners = function(){
    var _this = this;

    $('form').on('click', '.remove-row', function(e){
      e.preventDefault();
      $(this).closest('fieldset').remove();
    });

    $('.add-row').on('click', function(e){
      e.preventDefault();

      var $target = $($(this).attr('href'));
      var $clonable = $target.find('.clonable').first();
      var $clone = $clonable.clone();
      var heading = $(this).attr('data-heading');
      if (heading && heading.length) {
        $clone.prepend($('<h4>'+heading+'</h4>'));
      }
      $clone.append('<a href="#" title="Remove this row" class="remove-row">[x]</a>');
      $target.append($clone);
    });
  };

  return Advanced;

})();
