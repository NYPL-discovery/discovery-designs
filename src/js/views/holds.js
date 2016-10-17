var Holds = (function() {
  function Holds(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Holds.prototype.loadListeners = function(){
    var _this = this;

    $("#holds-table").tablesorter({
      // debug: true,
      textExtraction: function(node) {
        var $node = $(node);
        var value = $node.attr('data-value');
        if (value && value.length) return value;
        else {
          return $node.html().replace(/(<([^>]+)>)/ig,"");
        }
      }
    });

  };

  return Holds;

})();
