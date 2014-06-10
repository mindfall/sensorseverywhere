var nodemailer = require('nodemailer'),
	mongoose = require('mongoose'),
	Mail = mongoose.model('Mail'),
	fs = require('fs');

exports.getMail = function(req, res){
	Mail.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.sendInvitationEmail = function(req, res, address){
	var email = req.body.email;
	var name = req.body.name;
	var group = req.body.gid;
	var project = req.body.project;
	
	var subject = 'Invitation to wildFire';
	var message = "<h3>Hey " + name + "</h3>,  we'd like to invite you to join our group on wildFire. To do so just click the link below.";
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
		to: email,
		subject: subject,
		text: message,
		html: "Hey " + name + ", come and join our group. To do so just click on the link below. <br><a href='http://localhost:3030/signup-to-group'>Join group: " + group + " in project: " + project + " and make a difference today!</a>"
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