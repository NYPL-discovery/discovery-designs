var Search = (function() {
  function Search(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Search.prototype.loadListeners = function(){
    $('.bib-item-more-link').on('click', function(e){
      e.preventDefault();
      $(this).hide();
      $(this).closest('.bib-items').find('.bib-item').removeClass('more');
    });
  };

  return Search;

})();
