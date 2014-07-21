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
	var gid = req.body.gid;
	var group = req.body.group;
	var project = req.body.project;

	var subject = 'Invitation to wildFire';
	var message = "<h3>Hey " + name + "</h3>,  we'd like to invite you to join our group on wildFire. To do so just click the link below.";
	var mailOpts, smtpTran;

	smtpTrans = nodemailer.createTransport('SMTP', {
	    service: 'Gmail',
		auth: {
			user: "yourhsa@gmail.com",
			pass: "[wO9uy#2]FI^#SUn(p"
		}
	});

	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
		to: email,
		subject: subject,
		text: message,
		html: "Hey " + name + ", come and join our group the <b>" + group + "</b>. <br> You can view the details <a href='http://localhost:3033/projects/viewProjectDetails/" + project +"'>here.</a>" +
							  "<br><br><a href='http://localhost:3033/groupSignup/"+gid+"'>" + 
							  "<button style='background-color=#5cb85c; color=white'>Accept</button></a>" +
							  "&nbsp&nbsp<button style='background-color=#f0ad4e; color=white'>Decline</button>"
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