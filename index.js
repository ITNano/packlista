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


app.get('/', function(req, res, next){
	res.redirect('/lists');
});
app.get('/lists', function(req, res, next){
	res.render('pages/lists');
});


server.listen(3000, function(){
	console.log('server started at port 3000');
});