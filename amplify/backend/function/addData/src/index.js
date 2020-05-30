var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "eu-west-1" });
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});

exports.handler = async event => {
  // TODO implement

  let tableName = "Responses-rd5ujnadefamrene5w7p5aarn4-test";

  for (let i = 10; i < 1000; i++) {
    var params = {
      Item: {
        __typename: "Responses",
        _lastChangedAt: 1586939269738,
        _version: 1,
        createdAt: "2020-04-15T08:27:49.715Z",
        id: i.toString(),
        question: "179c0712-3300-4ac9-a0c9-ee547b216825",
        quiz: "e1a3ee8a-e314-4007-9673-378d983c9d83",
        subscriber: "a7c036be-cb3e-4c7d-87e6-b601b6326e50",
        updatedAt: "2020-04-15T08:27:49.715Z"
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: tableName
    };

    let putItem = new Promise((res, rej) => {
      documentClient.put(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          rej(err);
        } else {
          console.log("Success", data);
          res("Hi, insert data completed");
        }
      });
    });

    await putItem;
  }
};

/*
var AWS = require("aws-sdk")
var dynamodb = new AWS.DynamoDB({ region: "eu-west-1" })

async function add() {
  var params = {
    Item: {
      id: {
        S: "3",
      },
      question: {
        S: "179c0712-3300-4ac9-a0c9-ee547b216825",
      },
      quiz: {
        S: "e1a3ee8a-e314-4007-9673-378d983c9d83",
      },
      subscriber: {
        S: "a7c036be-cb3e-4c7d-87e6-b601b6326e50",
      },
      _version: {
        S: "1",
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "Responses-g26l5fi6abaoxmpnh5b6g3eebm-dev",
  }
  console.log("komt hier")
  await dynamodb.putItem(params, function(err, data) {
    if (err) {
      console.log(err, err.stack)
      console.log("niet hier")
      // an error occurred
    } else {
      console.log("en hier")
      console.log(data) // successful response
    }
  })
}

exports.handler = async event => {
  // TODO implement
  await add()

  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify("Hello from Lambda!"),
  //   }
  //   return response
}

*/
