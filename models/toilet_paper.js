var mongoose = require("mongoose");

var toiletPaperSchema = new mongoose.Schema({
	manufacturer: String,
	brandName: String,
	size: String,
	MSRP: String,
	UPC: String,


})

var ToiletPaper = mongoose.model("ToiletPaper", toiletPaperSchema);

module.exports = ToiletPaper;