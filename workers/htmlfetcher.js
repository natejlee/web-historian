// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

// module.exports
var fetch = function() {
  archive.readListOfUrls(archive.downloadUrls);
};

fetch();
