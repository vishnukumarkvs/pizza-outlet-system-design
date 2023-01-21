const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
import {
  ScanCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";

exports.handler = async function (event) {
  console.log("request", JSON.stringify(event, undefined, 2));

  let body;

  try {
    switch (event.httpMethod) {
      case "GET":
        body = await getAllPizzaInfo();
        break;
      case "POST":
        body = await postPizzaInfo(event.body);
        break;
      default:
        throw new Error(`Unsupported Route: ${event.httpMethod}`);
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: `Successfully Finished operation: ${event.httpMethod}`,
        body: body,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: "Failed to perform operation",
        errorMsg: e.message,
        errorStack: e.stack,
      }),
    };
  }
};

const getAllPizzaInfo = async () => {
  console.log("get all pizzas info");
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };
    const { Items } = await ddbClient.send(new ScanCommand(params));
    // console.log("Success", Items);
    return Items ? Items.map((item) => unmarshall(item)) : {};
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const postPizzaInfo = async (body) => {
  console.log("post pizza type info");

  try {
    let requestBody = JSON.parse(body);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(requestBody || {}),
    };

    const data = await ddbClient.send(new PutItemCommand(params));
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
