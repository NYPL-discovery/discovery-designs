'use strict';

//=include vendor/jquery-3.1.0.min.js

var Index = (function() {
  function Index(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Index.prototype.loadListeners = function(){
    $('.toggle-sublist').on('click', function(e){
      e.preventDefault();
      var $link = $(this);
      var $target = $link.closest('li').find('.sublist');
      $link.toggleClass('active');
      $target.toggleClass('active');
    });
  };

  return Index;

})();

$(function() {
  var indexView = new Index({});
});
