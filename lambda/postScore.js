'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
  var updateExp = "";
  if(event.scorer == 1){
    updateExp = "SET P1_score = P1_score + 1";
  } else {
    updateExp = "SET P2_score = P2_score + 1";
  }

	var params = {
    Key:{
      "game_id": event.game
    },
		TableName : "iot-footballtable-games",
    UpdateExpression: updateExp
	};

	documentClient.put(params, function(err, data){
		callback(err, data);
	});
}
