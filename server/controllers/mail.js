var nodemailer = require('nodemailer'),
	mongoose = require('mongoose'),
	Mail = mongoose.model('Mail'),
	fs = require('fs');

exports.getMail = function(req, res){
	Mail.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.sendMail = function(req, res, address){
	console.log(req.body);
	var mailOpts, smtpTran;

	smtpTrans = nodemailer.createTransport('SMTP', {
	    service: 'Gmail',
		auth: {
			user: "yourhsa@gmail.com",
			pass: "afro12can"
		}
	});

	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
		to: 'yourhsa@gmail.com',
		subject: 'Website contact form',
		text: req.body.message
	};

	smtpTrans.sendMail(mailOpts, function (error, response) {
			   //Email not sent
		if (error) {
			console.log('There was an error');
			res.send(error);
	    }
		else {
			console.log('success');
			res.send(response);
		}
	});
}

exports.upload = function(req, res) {

	fs.readFile(req.files.file.path, function (err, data) {
    	var newPath = __dirname + "/uploads/files";
  			fs.writeFile(newPath, data, function (err) {
  			res.redirect('back');
    		console.log('file written to ' + __dirname);
  		});
	});

}                   