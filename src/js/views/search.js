var Search = (function() {
  function Search(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.loadListeners();
  }

  Search.prototype.loadListeners = function(){
    var _this = this;

    $('.sub-item-more-link').on('click', function(e){
      e.preventDefault();
      $(this).hide();
      $(this).closest('.sub-items').find('.sub-item').removeClass('more');
    });

    $('.select-checkbox').on('change', function(){
      var checked = 0;
      $('.select-checkbox').each(function(i, el){
        if ($(this).is(':checked')) checked++;
      });
      if (checked>0) {
        $('.saved-items').text(checked + ' saved items').addClass('active');
      } else {
        $('.saved-items').removeClass('active');
      }
    });

    this.loadTimelineListeners();
  };

  Search.prototype.loadTimelineListeners = function(){
    var _this = this;
    var $timeline = $('#timeline-select');
    var timeline = new Hammer($timeline[0]);
    var x0 = 0, x1 = 0, w = 0;
    var mode = 'normal';
    this.$lefthandle = $('#timeline-handle-left');
    this.$righthandle = $('#timeline-handle-right');
    var lefthandle = new Hammer(this.$lefthandle[0]);
    var righthandle = new Hammer(this.$righthandle[0]);

    this.$dateStart = $('#input-date-start');
    this.$dateEnd = $('#input-date-end');
    this.minYear = parseInt(this.$dateStart.val());
    this.maxYear = parseInt(this.$dateEnd.val());
    this.yearRange = this.maxYear - this.minYear;

    $('.date-range input').on('change', function(e){
      _this.updateTimeline();
    });

    $('#timeline-select .bar').on('click', function(e){
      e.preventDefault();
      var year = $(this).attr('data-year');
      $('.date-range input').val(year);
      _this.updateTimeline();
    });

    righthandle.on('panstart', function(e){
      mode = 'right';
    });

    lefthandle.on('panstart', function(e){
      mode = 'left';
    });

    timeline.on('panstart', function(e){
      // console.log(e);
      w = $timeline.width();
      x0 = $timeline.offset().left;
      x1 = e.center.x;
    });

    timeline.on('panmove', function(e) {
      // console.log(e);
      if (mode=='right') _this.onRightHandlePan(x0, e.center.x, w);
      else if (mode=='left') _this.onLeftHandlePan(x0, e.center.x, w);
      else _this.onTimelinePan(x0, x1, e.center.x, w);
    });

    timeline.on('panend', function(e) {
      // console.log(e);
      mode = 'normal';
      $('.apply-changes').addClass('active');
    });
  };

  Search.prototype.onLeftHandlePan = function(x0, x1, w) {
    x1 = x1 - x0;
    var max = parseFloat(this.$righthandle.attr('data-value'));
    var w1 = x1/w * 100;
    if (w1 >= max) w1 = max - 1;
    this.$lefthandle.width(w1+'%').attr('data-value', w1);
    var maxYear = Math.round(max / 100 * this.yearRange + this.minYear);

    var d1 = Math.round((x1/w) * this.yearRange + this.minYear);
    if (d1 < this.minYear) d1 = this.minYear;
    if (d1 > maxYear) d1 = maxYear;
    this.$dateStart.val(d1);
  };

  Search.prototype.onRightHandlePan = function(x0, x2, w) {
    x2 = x2 - x0;
    var min = parseFloat(this.$lefthandle.attr('data-value'));
    var w2 = x2/w * 100;
    if (w2 <= min) w2 = min+1;
    w2 = 100-w2;
    this.$righthandle.width(w2+'%').attr('data-value', 100-w2);
    var minYear = Math.round(min / 100 * this.yearRange + this.minYear);

    var d2 = Math.round((x2/w) * this.yearRange + this.minYear);
    if (d2 > this.maxYear) d2 = this.maxYear;
    if (d2 < minYear) d2 = minYear;
    this.$dateEnd.val(d2);
  };

  Search.prototype.onTimelinePan = function(x0, x1, x2, w) {
    x1 = x1 - x0;
    x2 = x2 - x0;

    if (x2 < x1) {
      var tmp = x1;
      x1 = x2;
      x2 = tmp;
    }

    var w1 = x1/w * 100;
    var w2 = 100 - x2/w * 100;

    this.$lefthandle.width(w1+'%').attr('data-value', w1);
    this.$righthandle.width(w2+'%').attr('data-value', 100-w2);

    var d1 = Math.round((x1/w) * this.yearRange + this.minYear);
    var d2 = Math.round((x2/w) * this.yearRange + this.minYear);
    if (d1 < this.minYear) d1 = this.minYear;
    if (d2 > this.maxYear) d2 = this.maxYear;
    this.$dateStart.val(d1);
    this.$dateEnd.val(d2);
  };

  Search.prototype.updateTimeline = function(){
    var start = parseInt($('#input-date-start').val());
    var end = parseInt($('#input-date-end').val());
    if (!start || start < this.minYear) start = this.minYear;
    if (!end || end > this.maxYear) end = this.maxYear;

    if (start > end) {
      var tmp = start;
      start = end;
      end = tmp;
    }

    var w1 = (start - this.minYear) / this.yearRange * 100;
    var w2 = (end - this.minYear) / this.yearRange * 100;

    this.$lefthandle.width(w1+'%').attr('data-value', w1);
    this.$righthandle.width((100-w2)+'%').attr('data-value', w2);

    $('#input-date-start').val(start);
    $('#input-date-end').val(end);
    $('.apply-changes').addClass('active');
  };

  return Search;

})();
