import { DynamoDB } from 'aws-sdk';
import User from './User';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function get(user: User): Promise<User | undefined> {
    const params = {
        Key: { pk: user.pk, sk: user.sk },
        TableName: process.env.LOGOS_DDB as string,
    };

    const { Item } = await dynamoDb.get(params).promise();

    return Item as User;
}
