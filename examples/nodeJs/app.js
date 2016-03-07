var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var multer = require('multer');
var upload = multer();
var fs = require("fs");

var port = process.env.PORT || 5000;
var homeRouter = require('./controllers/home')();
var uploadRouter = require('./controllers/upload')();

app.use(express.static('public'));
app.use(express.static('src/scripts'));
app.use(express.static('src/content'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views','./src/views');
app.set('view engine', 'ejs');
app.set('layout', 'Shared/_Layout');
app.use(expressLayouts);

app.use('/', homeRouter);
app.use('/api', uploadRouter);

app.post('/api/uploadfiledata', upload.single('file'), function (req, res) {
  data= req.file.buffer;
  if(parseInt(req.body.chunkNo)==1){	
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


app.listen(port, function(){
	console.log('listening port '+port);
});