var express = require("express"),
app = express(),
methodOverride = require('method-override'),
bodyParser = require("body-parser"),
morgan = require("morgan")
db = require("./models");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//ROOT ROUTE
app.get('/', function(req,res){
	res.redirect('/toilet_paper');
});

//INDEX
app.get('/toilet_paper', function(req,res){
	db.ToiletPaper.find({}, function(err, tp){
		if (err) throw err;
		res.render("toilet_paper/index", {tp:tp});
	});
});

//NEW
app.get('/toilet_paper/new', function(req,res){
	res.render("toilet_paper/new");
})

//CREATE
app.post('/toilet_paper', function(req,res){
	db.ToiletPaper.create(req.body.tp, function(err){
		console.log("is tp correct?")
		res.redirect("/toilet_paper");
	});
});



app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});