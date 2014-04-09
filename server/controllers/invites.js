var nodemailer = require('nodemailer');

/*exports.invite = function(req, res){
	console.log('routes');
	//res.render('invite', {title: 'Contact Wade', page: 'invite'});
}*/

exports.sendInvite = function(req, res){
	
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
			res.render('invite', { title: 'Contribute to my project - Invitation', msg: 'Error occured, message not sent.', err: true, page: 'invite' })
	    }
		else {
			console.log('success');
			res.render('invite', { title: 'Contribute to my project - Invitation', msg: 'Message sent! Thank you.', err: false, page: 'invite' })
		}
	});
}