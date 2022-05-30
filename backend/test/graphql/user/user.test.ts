import { describe, it, expect } from 'vitest';
import { gql, GraphQLClient } from 'graphql-request';
import 'dotenv/config';
import { getGrapQLStackSettings } from '../../Util';

const listUsers = gql`
    query list {
        listUsers {
            pk
            sk
            firstName
        }
    }
`;

describe('user graphql tests', () => {
    it('create-user', async () => {
        // TODO implement tests
    });

    it('update-user', async () => {
        // TODO implement tests
    });

    it('find-user', async () => {
        // TODO implement tests
    });

    it('filter-user', async () => {
        // TODO implement tests
    });

    it('list-users', async () => {
        const grapqhQLStack = getGrapQLStackSettings();

        const endPoint = grapqhQLStack['DomainUrl'];
        const graphQLApiKey = grapqhQLStack['ApiKey'];
        const graphQLClient = new GraphQLClient(endPoint, {
            headers: {
                'x-api-key': graphQLApiKey,
            },
        });

        const data = await graphQLClient.request(listUsers);

        console.log(JSON.stringify(data, undefined, 2));

        expect(data).toBeDefined();
    });
});
