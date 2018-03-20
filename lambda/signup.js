'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
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
		if(err){
			console.error("Unable to put person " + JSON.stringify(err, null, 2));
			callback(err, data);
		} else {
			console.log("Successful put");
		}
	});
	var updateEx = "set player_" + event.player + " = :p";
	params = {
		Key:{
			"game_id": event.game
		},
		UpdateExpression: updateEx,
		ExpressionAttributeValues:{
			":p":event.email
		},
		ReturnedValues: "UPDATED_NEW",
		TableName: "iot-footballtable-games"
	}
	documentClient.update(params, function(err, data){
		if(err){
			console.error("Unable to update games " + JSON.stringify(err, null, 2));
			callback(err, data);
		} else {
			console.log("Successful update");
		}
	});
	callback(null, "Success");
}
