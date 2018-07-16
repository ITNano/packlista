var express = require('express'), http = require('http');
var app = express();
var server = http.createServer(app);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');
var upload = multer({ dest:'public/uploads/' });
app.use(upload.any());

var flash = require('express-flash'), cookieParser = require('cookie-parser'), session = require('express-session');
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.static('public'));
app.set('view engine', 'ejs');

var model = require('./model');

app.get('/', function(req, res, next){
	res.redirect('/lists');
});
app.get('/lists', function(req, res, next){
	model.getListData(function(data){
		res.render('pages/lists', {title: 'Lists', categories: data});
	});
});
app.post('/addcategory', function(req, res, next){
	if(req.body.name){
		model.addCategory(name, function(result){
			res.sendStatus(result.error?500:200);
		});
	}
});
app.post('/additem', function(req, res, next){
	if(req.body.name && req.body.categoryId){
		model.addItem(req.body.categoryId, req.body.name, function(result){
			res.sendStatus(result.error?500:200);
		});
	}
});
app.post('/toggleitem', function(req, res, next){
	if(req.body.itemId){
		model.toggleItem(req.body.itemId, function(result){
			res.sendStatus(result.error?500:200);
		});
	}
});

server.listen(3000, function(){
	console.log('server started at port 3000');
});