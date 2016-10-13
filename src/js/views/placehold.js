var Placehold = (function() {
  function Placehold(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Placehold.prototype.loadListeners = function(){
    var _this = this;

    $('input[name="location"]').on('change', function(e){
      $(this).closest('fieldset').find('label').removeClass('selected');
      $(this).closest('label').addClass('selected');
    });

  };

  return Placehold;

})();
