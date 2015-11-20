var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function(err, data){
    if (err) throw err;
    var listOfUrls = data.toString().split('\n');
    console.log(listOfUrls);
    cb(listOfUrls);
  });
};

exports.isUrlInList = function(string, cb){

  exports.readListOfUrls(function(urls) {
    var result = false
    if (urls.indexOf(string) !== -1){
      result = true;
    }
    cb(result);

  });
};

exports.addUrlToList = function(url, cb){
  cb = cb || function() {};
	fs.appendFile(exports.paths.list, url+'\n', function (err) {
	  if (err) throw err;
    cb(); //callback to downloadUrls to add site to folde sites archive
	});

};

exports.isUrlArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, data) {
    var result = false;
    if(err) throw err;
    if(data.indexOf(url) !== -1) {
      result = true;
    }
    cb(result);
  });
};

exports.downloadUrls = function(urlArray){
  _.each(urlArray, function(url) {
    exports.isUrlInList(url, function(result) {
      if (!result) {
        exports.isUrlArchived(url, function(result) {
          if (!result) {
            httpRequest.get(url, exports.paths.archivedSites + '/' + url, function (err, res) {
              if (err) {
                console.error(err);
                return;
              }
            });
          }
        });
        exports.addUrlToList(url);
      } else if (result){
        httpRequest.get(url, exports.paths.archivedSites + '/' + url, function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
        });

      }
      /*if (result) {
        exports.isUrlArchived(url, function(result) {
          if (!result) {
            //htmlfetcher(url);
          }
        });
      }*/
    });
  });

};
