import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async event => {
    console.log(event);
    const params = {
        TableName: process.env.LOGOS_DDB as string,
    };

    const result = await dynamoDb.scan(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
};
