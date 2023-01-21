import { Duration } from "aws-cdk-lib";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { IQueue, Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

interface MyQueueProps{
    consumer: IFunction;
    sender: IFunction;
}

export class MyQueue extends Construct{
    public readonly orderQueue: IQueue;
    constructor(scope: Construct, id: string, props: MyQueueProps){
        super(scope,id);

        this.orderQueue = new Queue(this, 'OrderQueue',{
            queueName: 'OrderQueue',
            visibilityTimeout: Duration.seconds(30),
            //receiveMessageWaitTime: Duration.seconds(10)
        })

        // props.consumer.addEventSource(new SqsEventSource(this.orderQueue,{
        //     batchSize: 1
        // }))
        this.orderQueue.grantConsumeMessages(props.consumer);
        this.orderQueue.grantSendMessages(props.sender);
    }
}