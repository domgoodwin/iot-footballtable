var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});



function main(name, email, twitter, game) {
  // Init dynamoDB link
  var docClient = new AWS.DynamoDB.DocumentClient();

  // Server side validations
  // TODO

  // Store user details in database
  var table = "iotfootball_users";
  var params = {
      TableName:table,
      Item:{
          "email": email,
          "name": name,
          "twitter": twitter,
          "last_game_id": game
      }
  };

  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          return false;
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
      }
  });

  // Link game db entry to user
  // game : gameId-player#
  var gameId = game.split('-')[0];
  var player = game.split('-')[1];

  // TODO update table entry with gameid

  // Only hit this if both were successful
  return true;
}
