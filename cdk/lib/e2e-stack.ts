import * as CDK from '@aws-cdk/core';

import {AllTables} from './constructs/dynamodb';
import {AllSnsTopics} from './constructs/sns-topics';
import {createLambda, EnvVars} from "./constructs/lambdas";
import {failsMiserablyLambda} from "./constructs/lambdas/fails-miserably";
import {errorLogger} from "./constructs/lambdas/error-logger";
import {addCfnOutput} from "./constructs/cfn-output";
 import {calls3rdPartyApi} from "./constructs/lambdas/calls-3rd-party-api";

export interface CreateStackProps {
    topics: AllSnsTopics;
    tables: AllTables;
    envVars: EnvVars;
}

export interface StackTopicProps {
    region: string;
}

export const createStack: (stack: CDK.Stack, p: CreateStackProps) => void =
    (scope, {topics: {SNS_TOPIC_ERRORS, SNS_START, SNS_TOPIC_SUCCESS}, tables, envVars}) => {
        const {resourcesTable, errorsTable} = tables;

        const lambdaprod1 = createLambda
        (scope)
        ({envVars})
        (failsMiserablyLambda({resourcesTable})({SNS_TOPIC_ERRORS}));

        createLambda
        (scope)
        ({envVars})
        (errorLogger({errorsTable} )({SNS_TOPIC_ERRORS}));

        createLambda
        (scope)
        ({envVars})

        (calls3rdPartyApi({envVars})
        ({errorsTable, resourcesTable})
        ({SNS_TOPIC_ERRORS, SNS_START, SNS_TOPIC_SUCCESS})
        );

        // TODO: Add a function to 'calls3rdPartyAPI', import commented above

        addCfnOutput(scope)('lambdaThatFails')({
            value: lambdaprod1.functionName,
            exportName: `${scope.stackName}:Lambda:prod1`,
        });

        return {}
    };
