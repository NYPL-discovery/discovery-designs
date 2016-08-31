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

    $('.tab').on('click', function(e){
      e.preventDefault();
      var $tab = $(this);
      var $tabs = $(this).closest('.tabs').find('.tab');
      $tabs.attr('aria-selected', 'false');
      $tab.attr('aria-selected', 'true');
      var $panel = $($tab.attr('href'));
      var $panels = $(this).closest('.tabs').next('.tabpanels').find('.tabpanel');
      $panels.removeClass('active');
      $panel.addClass('active');
    });

    $(document).on('click', function(e){
      var $search = $(e.target).closest('.search');
      if (!$search.length) $('.search').removeClass('active');

      var $li = $(e.target).closest('li.active');
      if (!$li.length) $('.main-nav li').removeClass('active');
    });
  };

  return Header;

})();
