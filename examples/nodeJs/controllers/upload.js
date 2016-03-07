var express = require('express');
var uploadRouter = express.Router();
var fs = require("fs");
function uploadRouterProvider(){
	uploadRouter.route('/upload')
		.post(function(req, res){
			var rawData=req.body.fileData.split(';base64,');
			var data = new Buffer(rawData[1], 'base64');
			if(parseInt(req.body.chunk)==1){	
				fs.writeFile('./uploads/'+req.body.fileName, data, null, function(){
					res.sendStatus(200);
				});
			}
			else{
				fs.appendFile('./uploads/'+req.body.fileName, data, function(){
					res.sendStatus(200);
				});
			}	
		})
		.delete(function(req, res){
			fs.unlink('./uploads/'+req.body.fileName, function(){
				res.sendStatus(200);
			});
		});
	return uploadRouter;
}

module.exports = uploadRouterProvider;