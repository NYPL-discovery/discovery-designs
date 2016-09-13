'use strict';

//=include vendor/jquery-3.1.0.min.js
//=include vendor/js.cookie.js
//=include vendor/jquery.querystring.js

var Wireframes = (function() {
  function Wireframes(options) {
    var defaults = {};
    this.opt = $.extend({}, defaults, options);
    this.checkUser();
    this.loadListeners();
  }

  Wireframes.prototype.checkUser = function(){
    var _this = this;

    if ($.QueryString["pin"] || Cookies.get('loggedin')) {
      this.login();

    } else {
      this.logout();
    }
  };

  Wireframes.prototype.loadListeners = function(){
    var _this = this;

    $('.log-out').on('click', function(e){
      e.preventDefault();
      _this.logout();
    });

    $('a[href="signin.html"]').on('click', function(e){
      e.preventDefault();
      _this.login();
    });
  };

  Wireframes.prototype.login = function(){
    Cookies.set('loggedin', 'true');
    $('.no-user').removeClass('active');
    $('.user').addClass('active');
  };

  Wireframes.prototype.logout = function(){
    Cookies.remove('loggedin');
    $('.no-user').addClass('active');
    $('.user').removeClass('active');
  };

  return Wireframes;

})();

$(function() {
  var wireframesView = new Wireframes({});
});
