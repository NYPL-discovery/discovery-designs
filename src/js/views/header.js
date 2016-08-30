var Header = (function() {
  function Header(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Header.prototype.loadListeners = function(){
    $('.nav-link.has-children').on('click', function(){
      $(this).closest('li').toggleClass('active');
    });

    $('.search-input').on('focus', function(){
      $(this).closest('.search').addClass('active');
    });

    $(document).on('click', function(e){
      var $search = $(e.target).closest('.search');
      if (!$search.length) $('.search').removeClass('active');
    });
  };

  return Header;

})();
