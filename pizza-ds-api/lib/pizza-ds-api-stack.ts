import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PizzaApiGateways } from './api';
import { PizzaDatabase } from './database';
import { PizzaService } from './microservices';
import { MyQueue } from './queue';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PizzaDsApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const database = new PizzaDatabase(this,'PizzaDatabase');

    const pizzaServices = new PizzaService(this,'PizzaMicroservice',{
      pizzaTable: database.pizzaTable
    })

    const pizzaApiGateway = new PizzaApiGateways(this, 'PizzaApis',{
      pizzaInfoFunction: pizzaServices.pizzaInfoMicroservice,
      orderInfoFunction: pizzaServices.orderInfoMicroservice,
      postOrderInfoFunction: pizzaServices.postOrderInfoMicroservice
    })

    const orderQueue = new MyQueue(this,'FinalQueue',{
      consumer: pizzaServices.orderInfoMicroservice,
      sender: pizzaServices.postOrderInfoMicroservice
    });
  }
}
