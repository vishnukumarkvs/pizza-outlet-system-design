import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface PizzaServiceProps{
    pizzaTable: ITable;
}

export class PizzaService extends Construct{
    public readonly pizzaInfoMicroservice: NodejsFunction;
    public readonly orderInfoMicroservice: NodejsFunction;
    public readonly postOrderInfoMicroservice: NodejsFunction;

    constructor(scope: Construct, id:string,props:PizzaServiceProps){
        super(scope,id);
        this.pizzaInfoMicroservice = this.createPizzaInfoMicroservice(props.pizzaTable);
        this.orderInfoMicroservice = this.createOrderInfoMicroservice();
        this.postOrderInfoMicroservice = this.createPostOrderInfoMicroservice();
    }

    private createPizzaInfoMicroservice(pizzaTable:ITable){
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling:{
                externalModules:[
                    'aws-sdk'
                ]
            },
            environment:{
                PRIMARY_KEY: 'title',
                DYNAMODB_TABLE_NAME: pizzaTable.tableName
            },
            runtime: Runtime.NODEJS_14_X
        }
        const pizzaFunction = new NodejsFunction(this,'pizzaLambdaFunction',{
            entry: join(__dirname,`/../src/pizzainfo/index.js`),
            ...nodeJsFunctionProps
        })

        pizzaTable.grantReadWriteData(pizzaFunction);
        return pizzaFunction;
    }

    private createOrderInfoMicroservice(){
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling:{
                externalModules:[
                    'aws-sdk'
                ]
            },
            environment:{
                QUEUE_NAME: 'OrderQueue',
            },
            runtime: Runtime.NODEJS_14_X
        }
        const orderFunction = new NodejsFunction(this,'orderLambdaFunction',{
            entry: join(__dirname,`/../src/queueData/index.js`),
            ...nodeJsFunctionProps
        })
        return orderFunction;
    }
    private createPostOrderInfoMicroservice(){
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling:{
                externalModules:[
                    'aws-sdk'
                ]
            },
            environment:{
                QUEUE_NAME: 'OrderQueue',
            },
            runtime: Runtime.NODEJS_14_X
        }
        const postOrderFunction = new NodejsFunction(this,'postOrderLambdaFunction',{
            entry: join(__dirname,`/../src/postQueue/index.js`),
            ...nodeJsFunctionProps
        })
        return postOrderFunction;
    }
}