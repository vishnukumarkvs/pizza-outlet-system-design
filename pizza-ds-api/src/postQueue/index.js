import { GetQueueUrlCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "./sqsClient";
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { ddbClient } = require("./ddbClient");


exports.handler = async function(event){
    console.log("sqsrequest", JSON.stringify(event, undefined, 2));

    let body;
    try{
        switch(event.httpMethod){
            case "POST":
                body = await postOrder(event);
                break;
            default:
                throw new Error(`Unsupported route: "${event.httpMethod}"`);
        }
            return{
                statusCode: 200,
                body: JSON.stringify({
                    message: `Successfully finished operation: "${event.httpMethod}"`,
                    body: body
                })
            }  
        }catch(e){
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Failed to perform operation",
                    errorMsg: e.message,
                    errorStack: e.stack,
                })
            }
        }
}

const postOrder = async(event) =>{
    console.log(`Request event to add it to queue: ${JSON.stringify(event)}`);

    try{
        let body = JSON.parse(event.body);
        // let newObject = Object.assign({}, body, { orderId: "12345" });
        // console.log(newObject);
        const params0 = {
            QueueName: process.env.QUEUE_NAME,
        }

        const url = await sqsClient.send(new GetQueueUrlCommand(params0));
         
        const params = {
            QueueUrl: url['QueueUrl'],
            MessageBody: JSON.stringify(body)
        }
        const data = await sqsClient.send(new SendMessageCommand(params));
        const putParams = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {})
        }
        const putData = await ddbClient.send(new PutItemCommand(putParams));
        console.log(`Output after posting order body to queue: ${JSON.stringify(data)}`);
        console.log(`Output after posting order body to DynamoDB: ${JSON.stringify(putData)}`);
        return data;

    }catch(e){
        console.error(e);
        throw e;
    }

}