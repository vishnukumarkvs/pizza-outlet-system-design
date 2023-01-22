import { GetQueueUrlCommand, ReceiveMessageCommand, DeleteMessageCommand  } from "@aws-sdk/client-sqs";
import { sqsClient } from "./sqsClient";


exports.handler = async function(event){

    console.log("sqsrequest", JSON.stringify(event, undefined, 2));

    let body;
    try{
        switch(event.httpMethod){
            case "GET":
                body = await getOrder(event);
                break;
            default:
                throw new Error(`Unsupported route: "${event.httpMethod}"`);
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

const getOrder = async(event) =>{
    console.log(`getOrderFromQueue: ${event}`)
    const params0 = {
        QueueName: process.env.QUEUE_NAME,
    }

    const url = await sqsClient.send(new GetQueueUrlCommand(params0));
    const params = {
        QueueUrl: url['QueueUrl'],
    }
    const response = await sqsClient.send(new ReceiveMessageCommand(params));
    console.log(`Get Response Structure:${JSON.stringify(response)}`);

    if (response.Messages && response.Messages.length > 0) {
        const messages = response.Messages;
        const result = await Promise.all(messages.map(async message => {
            const body = JSON.parse(message.Body);
            const deleteParams = {
                QueueUrl: url['QueueUrl'],
                ReceiptHandle: message.ReceiptHandle
            }
            await sqsClient.send(new DeleteMessageCommand(deleteParams));
            return body;
        }));
        return result;
    } else {
        console.log("No messages in the queue");
        return [];
    }
}

// response 
// {
//     "$metadata": {
//         "httpStatusCode": 200,
//         "requestId": "ac79c019-d907-5ee0-9053-9c5c62ed250d",
//         "attempts": 1,
//         "totalRetryDelay": 0
//     },
//     "Messages": [
//         {
//             "MessageId": "2de2f57a-7fad-45f3-a71f-488b52828e33",
//             "ReceiptHandle": "AQEBW5k4cr37Q0uPZAPHWlSg76cOExcDqnU1QKTjkgXlc199jDQCLmQyhCDblBWSRHYFb58QwfiOMPTlZnYb1X4axmU4NpcW88INxCybpfSGeGsSCfU+ubrU7a/dDTWQi2HN3TwhtgJ1qEzUb1Z28yBGTHXUAdZOMI37xID+6L7YmeeQwbsFRSVE/ZWqJkgTywjf8lZB4PaGJqGmBHrB0fpS5L8uA9ScGczMqyZemGcb3nw3hSQBveUEzTGPeBvPWNGbCw36ov62hX28ZkZ2KIm35tRCM5ZtHBGzYNa3vBfjNw3Rz7pWPNYfd3/EXc0tL0VfD6S4mAkt1RZOZ7ScC8pGDCZH7Vm1iNIjotg8v/27HF9i6K5phhD3zzQBFkp6R+ZyMGublgr2nZZW0hsxFn9CsA==",
//             "MD5OfBody": "88371f00bccc34cd3fe691ea4fc81fac",
//             "Body": "{\"title\":\"by\",\"price\":111,\"khsdfoshh\":99}"
//         }
//     ]
// }