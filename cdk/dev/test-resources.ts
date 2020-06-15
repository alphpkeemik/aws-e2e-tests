import * as CDK from '@aws-cdk/core';
import * as DynamoDB from '@aws-cdk/aws-dynamodb';

import {createSpyLambda, SpyLambdaTopics} from './constructs/spy-lambda';
import {env} from "../bin/env";
import {AllTables} from "../lib/constructs/dynamodb";
import {createLambda, EnvVars} from "../lib/constructs/lambdas";
import {addCfnOutput} from "../lib/constructs/cfn-output";

export interface TestResourcesProps {
    topics: SpyLambdaTopics;
    tables: AllTables;
    spyTable: DynamoDB.ITable;
    envVars: EnvVars
}

// tslint:disable-next-line:no-empty-interface
interface E2EStackOutput {
    spyTable: DynamoDB.ITable
}

export const addTestResources: (stack: CDK.Stack, p: TestResourcesProps) => E2EStackOutput =
    (scope, {topics, envVars}) => {
        const {SNS_TOPIC_ERRORS, SNS_START, SNS_TOPIC_SUCCESS} = topics;
        const spyTable = getDynamoDBTable(scope, `spy-table`)
        createLambda(scope)({envVars})(createSpyLambda({spyTable})({SNS_TOPIC_ERRORS, SNS_START, SNS_TOPIC_SUCCESS}));

        return {spyTable};
    };


const getDynamoDBTable: (scope: CDK.Stack, tableBaseName: string) => DynamoDB.ITable =
    (scope, tableBaseName) => {
        const tableName = `${tableBaseName}-${env}`;
        return DynamoDB.Table.fromTableArn(scope, tableName, `arn:aws:dynamodb:${scope.region}:${scope.account}:table/${tableName}`);
    };

export const createTable: (scope: CDK.Stack, id: string, props: { tableName: string }) => DynamoDB.ITable =
    (scope, id, props) =>
        new DynamoDB.Table(scope, id, {
            partitionKey: {name: 'pk', type: DynamoDB.AttributeType.STRING},
            sortKey: {name: 'sk', type: DynamoDB.AttributeType.STRING},
            tableName: props.tableName,
        });


export const createTestTables: (stack: CDK.Stack) => E2EStackOutput =
    (scope) => {
        const spyTableName = `spy-table-${env}`
       const spyTable = createTable(scope, spyTableName, {tableName: spyTableName});

        addCfnOutput(scope)('SpyTableName')({
            value: spyTableName,
            exportName: `${ scope.stackName }:Table:SpyTableName`,
        });

        return {spyTable};
    };
