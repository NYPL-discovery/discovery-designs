'use strict';

//=include vendor/jquery-3.1.0.min.js
//=include vendor/hammer.min.js
//=include views/header.js
//=include views/facets.js
//=include views/search.js

$(function() {
  var headerView = new Header({});
  var facetView = new Facets({});
  var searchView = new Search({});
});
