'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.writeMovie = function(event, context, callback){
	var params = {
    Item:{
        "email": event.email,
        "name": event.name,
        "twitter": event.twitter,
        "last_game_id": event.game
    },
		TableName : "iot-footballtable-users"
	};

	documentClient.put(params, function(err, data){
		callback(err, data);
	});
}
