import { Cors, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface PizzaApiProps{
    pizzaInfoFunction: IFunction;
    orderInfoFunction: IFunction;
    postOrderInfoFunction: IFunction;
}

export class PizzaApiGateways extends Construct{
    constructor(scope:Construct,id:string, props: PizzaApiProps){
        super(scope,id);
        this.createPizzaInfoApi(props.pizzaInfoFunction);
        this.createOrderInfoApi(props.orderInfoFunction);
        this.postOrderInfoApi(props.postOrderInfoFunction);
    }

    private createPizzaInfoApi(pizzaInfoFunction:IFunction){
        const apiGateway = new LambdaRestApi(this,'pizzaInfoApigw',{
            handler: pizzaInfoFunction,
            proxy: false,
            restApiName: 'Pizza Info Microservice',
        })

        const pizzaTypes = apiGateway.root.addResource('pizzatypes');
        // pizzaTypes.addCorsPreflight({
        //     allowOrigins:Cors.ALL_ORIGINS,
        //     allowMethods:Cors.ALL_METHODS,
        // })
        pizzaTypes.addMethod('GET');
        pizzaTypes.addMethod('POST');

        // const queuePoll = apiGateway.root.addResource('queuePoll');
        // queuePoll.addMethod('GET');
    }
    private createOrderInfoApi(orderInfoFunction:IFunction){
        const apiGateway = new LambdaRestApi(this,'orderInfoApigw',{
            handler: orderInfoFunction,
            proxy: false,
            restApiName: 'Get Order Info Microservice',
        })

        const queuePoll = apiGateway.root.addResource('queuePoll');
        queuePoll.addMethod('GET');
    }
    private postOrderInfoApi(postOrderInfoFunction:IFunction){
        const apiGateway = new LambdaRestApi(this,'postOrderInfoApigw',{
            handler: postOrderInfoFunction,
            proxy: false,
            restApiName: 'Post Order Info Microservice',
        })

        const postOrder = apiGateway.root.addResource('postOrder');
        postOrder.addMethod('POST');
    }
}