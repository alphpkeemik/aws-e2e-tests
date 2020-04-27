import {Handler, SNSEvent} from 'aws-lambda';
import {DynamoDB, SNS} from 'aws-sdk';
import * as http from "http";

interface Message {
    domain: string;
    data: { error: string; bar: string; };
}

const callFunc: (domain: string) => Promise<any> =
    domain => {
        return new Promise((resolve, reject) => {
            const options = {
                host: domain,
                path: '/a/random/path/that/is/used',
                method: 'POST'
            }
            const req = http.request(options, (res) => {
                console.log(res)
                resolve(res)
            })
            req.on('error', (e) => {
                reject({error: `RANDOM err, ${e}`})
            })

            req.write('');
            req.end();
        });
    }

export const handler: Handler<SNSEvent, { statusCode: number, body: string }> =
    async (event, context) => {
        console.log('Lambda that calls 3rd party API', event, context);
        const region = context.invokedFunctionArn.split(':')[3];
        const documentClient = new DynamoDB.DocumentClient({region});

        for (const record of event.Records) {
            const {domain} = JSON.parse(record.Sns.Message);

            if (domain) {
                const input: DynamoDB.DocumentClient.GetItemInput = {
                    TableName: process.env.RESOURCE_TABLE_NAME || 'a-random-table-that-probably-does-not-exist',
                    Key: {
                        domain,
                    },
                };
                const documentEntry = await documentClient.get(input).promise();

                const Item = documentEntry.Item || {};

                let apiCall: string | undefined = Item.api;
                if (!apiCall) {
                    apiCall = process.env.API_CALL_URL;

                    if (apiCall) {
                        const body = await callFunc(apiCall)

                        const successsnsarn = process.env.SUCCESS_SNS_ARN;
                        await new SNS({region})
                            .publish({Message: JSON.stringify(body), TopicArn: successsnsarn})
                            .promise();
                    }
                }

                if (false) {

                    const message: Message = {domain, data: Item?.data || 'Unknown data'};

                    const errorTopicArn = process.env.SUCCESS_SNS_ARN;
                    await new SNS({region})
                        .publish({Message: JSON.stringify(message), TopicArn: errorTopicArn})
                        .promise();
                }
            }

        }


        const response = {
            statusCode: 503,
            body: JSON.stringify({message: 'Fails, as expected'}),
        };

        return response;
    };