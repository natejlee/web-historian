var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {


	if(req.method === 'GET'){

		if(req.url ==='/'){
			fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, html){
				utils.sendResponse(res, html.toString());
			})
		}

		if(req.url === '/styles.css'){
			fs.readFile(archive.paths.siteAssets +'/styles.css', function(err, css){
				utils.sendResponse(res, css, {headers: {'Content-type': 'text/css'}});
			})
		}

	} else if(req.method === 'POST'){
		var body = '';

		req.on('data', function(chunk){
			body += chunk;
		});
		req.on('end', function(){
			var site = body.substr(4);
			archive.isUrlArchived(site, function(result){
				if(result){
					fs.readFile(archive.paths.archivedSites + '/' + site, function(err, html){
						utils.sendResponse(res, html.toString());
					})
				} else {
					archive.addUrlToList(site, function(){
						fs.readFile(archive.paths.siteAssets + '/loading.html', function(err,html){
							utils.sendResponse(res, html.toString());
						});
					})
				}
			});
		});

		// console.log(req.name);
	} else {
		utils.sendResponse(res, '', 404);
	}



  // res.end(archive.paths.list);
};
