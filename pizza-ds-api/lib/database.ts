import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class PizzaDatabase extends Construct{

    public readonly pizzaTable:ITable;

    constructor(scope:Construct,id:string){
        super(scope,id);
        this.pizzaTable = this.createPizzaTable();

    }

    private createPizzaTable() : ITable{
        const pizzaTable = new Table(this,'PizzaInfo',{
            partitionKey: {name:'title', type:AttributeType.STRING},
            tableName: "PizzaInfo",
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
        })
        return pizzaTable;
    }

    // private createOrderTable(): ITable{
    //     const orderTable=
    // }
} 