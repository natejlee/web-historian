var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.sendResponse = function(res, data, options) {
  if (!options) {
    options = {
      statusCode: 200,
      headers: exports.headers
    };
  }
  if (!options.statusCode) {
    options.statusCode = 200;
  }

  res.writeHead(options.statusCode, options.headers);
	res.end(data);
}

// As you progress, keep thinking about what helper functions you can put here!
