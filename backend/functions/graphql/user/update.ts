import { DynamoDB } from 'aws-sdk';
import User from './User';

const dynamoDb = new DynamoDB.DocumentClient();

export default async function update(user: User): Promise<User> {
    const params = {
        Key: { pk: user.pk, sk: user.sk },
        ReturnValues: 'UPDATED_NEW',
        UpdateExpression: 'SET twitterHandle = :twitterHandle, firstName = :firstName, lastName = :lastName, email= :email',
        TableName: process.env.LOGOS_DDB as string,
        ExpressionAttributeValues: {
            ':twitterHandle': user.twitterHandle,
            ':firstName': user.firstName,
            ':lastName': user.lastName,
            ':email': user.email,
        },
    };

    await dynamoDb.update(params).promise();

    return user as User;
}
