import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function list(): Promise<Record<string, unknown>[] | undefined> {
    const params = {
        TableName: process.env.LOGOS_DDB as string,
    };

    const data = await dynamoDb.scan(params).promise();

    return data.Items;
}
