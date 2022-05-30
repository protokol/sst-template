import { DynamoDB } from 'aws-sdk';
import User from './User';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function create(user: User): Promise<User> {
    const params = {
        Item: user as Record<string, unknown>,
        TableName: process.env.LOGOS_DDB as string,
    };

    await dynamoDb.put(params).promise();

    return user;
}
