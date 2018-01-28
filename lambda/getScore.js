'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
  var params = {
   Key: {
    "game_id": {
      S: event.gameID
     }
   },
   TableName: "iot-footballtable-games"
  };

	documentClient.getItem(params, function(err, data){
		callback(err, data);
	});
}
