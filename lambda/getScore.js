'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback){
  //callback(null, {statusCode: 200, body: JSON.stringify(event) });
  var params = {
   Key: {
    "game_id": event['pathParameters']['id']
   },
   TableName: "iot-footballtable-games"
  };

	documentClient.get(params, function(err, data){
    var response = {
      "statusCode": 200,
      "headers": {
      },
      "body": JSON.stringify(data),
      "isBase64Encoded": false
    };
    
    var cb = event['queryStringParameters']['callback']
    var body = ( !!cb && cb.length > 0 )  ? cb.replace( /[^a-z0-9_]/i, '' ) + '(' + JSON.stringify( data ) + ')' : data;
    if(err){
      callback(null, {"statusCode": 500, "headers": {},"body": JSON.stringify(err),"isBase64Encoded": false});
    } else {
      callback(null, {"statusCode": 200, "headers": {},
      "body":  body,//JSON.stringify(data),
      "isBase64Encoded": false});
    }

	});
}
