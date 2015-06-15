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
		res.render("/toilet_paper/index", {tp:tp});
	})
});

//NEW -- FORM
app.get('/toilet_paper/new', function(req,res){
	res.render("/toilet_paper/new");
})

//CREATE A NEW RECORD
app.post('/toilet_paper', function(req,res){
	db.ToiletPaper.create(req.body.tp, function(err){
		console.log("is tp correct?")
		res.redirect("/toilet_paper");
	})
});

//SHOW ONE RECORD
app.get('/toilet_paper/:id', function(req,res){
	db.ToiletPaper.findById(req.params.id, function(err, tp){
		if(err){
			res.render("404");
		} else {
			res.render("show", {tp:tp});
		}
	})
});

//EDIT -- DISPLAY FORM
app.get('/toilet_paper/:id/edit', function(req,res){
	db.ToiletPaper.findById(req.params.id, function(err, tp){
		if(err){
			res.render("404");			
		} else {
			res.render('edit', {tp:tp});
		}
	})
});

//EDIT -- MODIFY DATA
app.put('/toilet_paper/:id', function(req,res){
	db.ToiletPaper.findByIdAndUpdate(req.params.id, req.body.book, function(err, book){
		if(err){
			res.render("404");
		} else {
			res.redirect("/toilet_paper");
		}
	})
});

//DELETE ONE RECORD
app.delete('/toilet_paper/:id', function(req,res){
	db.ToiletPaper.findByIdAndRemove(req.params.id, function(err, tp){
		if(err){
			res.render("404");
		} else {
			res.redirect('/toilet_paper');
		}
	})
});

//ERROR WILDCARD
app.get('*', function(req,res){
  res.render('404');
});

//SERVER
app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});