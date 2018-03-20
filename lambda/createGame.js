'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
    var gameID = (+new Date()).toString()
	var params = {
    Item:{
        "game_id": gameID,
        "game_name": event.name
    },
		TableName : "iot-footballtable-games"
    };
    

	documentClient.put(params, function(err, data){
		if(err){
			console.error("Unable to put game " + JSON.stringify(err, null, 2));
			callback(err, data);
		} else {
			console.log("Successful put");
		}
	});
	callback(null, "game:" + gameID);
}
