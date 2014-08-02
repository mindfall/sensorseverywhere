var mongoose = require('mongoose'),
	Wildlife = mongoose.model('Wildlife');

exports.getWildlife = function(req, res){
	Wildlife.find({}).exec(function(err, collection){
		res.send(collection);
	});
};

exports.addWildlife = function(req, res) {
	var wildlife = req.body;
	var id = wildlife.id;
	var name = wildlife.name;
	var image_thumb = wildlife.image_thumb;
	var image_full = wildlife.image_full;
	var country = wildlife.country;
	var province = wildlife.province;
	var population = wildlife.population;
	var survival_rating = wildlife.survival_rating;
	var description = wildlife.description;
	var classification = wildlife.classification;

	var saveWildlife = Wildlife.create({
		"id": id,
		"name": name,
		"image_thumb": image_thumb,
		"image_full": image_full,
		"country": country,
		"province": province,
		"population": population,
		"survival_rating": survival_rating,
		"description": description,
		"classification": classification
	});
}

exports.updateWildlife = function(req, res) {
	Wildlife.findById(req.params.id, function(err, wildlife) {
		Wildlife.update();
	});
}

exports.removeWildlife = function(req, res) {
	Wildlife.findById(req.params.id, function(err, wildlife) {
		Wildlife.remove(function(err, wildlife) {
			res.send(wildlife);
		});
	});
}

