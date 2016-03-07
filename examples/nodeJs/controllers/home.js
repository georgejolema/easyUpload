var express = require('express');
var homeRouter = express.Router();

function homeProvider(){
	homeRouter.route('/').get(function(req, res){
		res.render('Home/index',{id:1});
	});	
	return homeRouter;
}

module.exports = homeProvider;