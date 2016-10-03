var Item = (function() {
  function Item(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Item.prototype.loadListeners = function(){
    var _this = this;

    $('.more-link').on('click', function(e){
      e.preventDefault();
      var $table = $(this).closest('.holdings-table');
      $table.find('.more').css('display','none');
      $table.find('.hidden').removeClass('hidden');
    });
  };

  return Item;

})();
