var Facets = (function() {
  function Facets(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Facets.prototype.loadListeners = function(){
    $('select').on('change', function(e){
      var val = $(this).val();
      if (val.toLowerCase()=='all') $(this).removeClass('selected');
      else $(this).addClass('selected');
    });
  };

  return Facets;

})();
