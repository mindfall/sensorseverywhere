var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MailSchema = new Schema({
    id: Number,
    from: String,
    to: String,
    sent_at: Date,
    subject: String,
    body: String
   
}, {strict: 'true'});


var Mail = mongoose.model('Mail', MailSchema);

function createDefaultMail(){

    Mail.find({}).exec(function(err, collection){
        if(collection.length === 0){

            Mail.create({id: 1, from: 'Joe', to: 'Eames', sent_at: '12/10/1990', subject: 'Recipe', body: 'salty with a dash of sweet'});
            Mail.create({id: 2, from: 'wade', to: 'Mansell', sent_at: '15/08/2004', subject: 'For', body: 'salt can be bad for your arteries'});
            Mail.create({id: 3, from: 'Soph', to: 'Buttner', sent_at: '01/01/2001', subject: 'Success', body: 'salt can be good for your water retention'});
        }
    })
}

exports.createDefaultMail = createDefaultMail;