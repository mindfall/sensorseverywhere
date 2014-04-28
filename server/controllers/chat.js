var mongoose = require('mongoose'),
	Chat = mongoose.model('Chat'),
	Group = mongoose.model('Group');

/**
* get all chat logs
*/

exports.getChatLogs = function(req, res){
	Chat.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

/**
* create a chat log
*/

exports.createChatLog = function(req, res, next){
	var chatData = req.body;
	
	//stub
	var saveChatLog = Chat.create ({
	}, 
	function(){
	 	res.send(saveChatLog);
	});
};

/**
* update a chat log -- not sure if this is needed. 
*/

exports.updateChatLog = function(req, res, next){
	var chatData = req.body;
	
	//stub
	var updateChatLog = Chat.update ({
	}, 
	function(){
	 	res.send(updateChatLog);
	});
};

/**
* get chat logs by id
*/

exports.getChatLogById = function(req, res){
	Chat.findOne({_id:req.params.id}).exec(function(err, chat) {
		res.send(chat);
	});
}

/**
* remove chat log - admin or project owner access only
*/

exports.removeChatLog = function(req, res, next){
	console.log(req);
}
