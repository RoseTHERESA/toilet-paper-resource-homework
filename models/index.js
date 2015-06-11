var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/paper_products_dev");
mongoose.set("debug", true);


module.exports.ToiletPaper = require("./toilet_paper");

