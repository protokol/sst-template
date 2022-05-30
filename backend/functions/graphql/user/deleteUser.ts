import { DynamoDB } from 'aws-sdk';
import User from './User';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function deleteUser(user: User): Promise<User | undefined> {
    const params = {
        Key: { pk: user.pk, sk: user.sk },
        TableName: process.env.LOGOS_DDB as string,
    };

    await dynamoDb.delete(params).promise();

    return user;
}
