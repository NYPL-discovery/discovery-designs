var Home = (function() {
  function Home(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Home.prototype.loadListeners = function(){
    var _this = this;

    $('.more-link').on('click', function(e){
      e.preventDefault();
      $(this).closest('li').hide();
      $(this).closest('ul').find('.more').removeClass('more');
    })

  };

  return Home;

})();
