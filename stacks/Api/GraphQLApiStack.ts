import { StackContext, AppSyncApi, use } from '@serverless-stack/resources';
import { DatabaseStack } from '../Database/DatabaseStack';

export function GraphQLApiStack(ctx: StackContext) {
    const db = use(DatabaseStack);
    const stage = ctx.app.stage;

    // Create the AppSync GraphQL API
    const graphqlApi = new AppSyncApi(ctx.stack, 'AppSyncApi', {
        customDomain: {
            domainName: `${stage}-graphql.${process.env.HOSTED_ZONE_DOMAIN}`,
            hostedZone: `${process.env.HOSTED_ZONE_DOMAIN}`,
        },
        schema: 'backend/functions/graphql/schema.graphql',
        defaults: {
            function: {
                environment: {
                    LOGOS_DDB: db.logosDdb.tableName,
                },
            },
        },
        dataSources: {
            users: 'functions/graphql/user/lambda.handler',
        },
        resolvers: {
            'Query     listUsers': 'users',
            'Query       getUser': 'users',
            'Mutation createUser': 'users',
            'Mutation updateUser': 'users',
            'Mutation deleteUser': 'users',
        },
    });

    // Enable the AppSync API to access the DynamoDB table
    graphqlApi.attachPermissions([db.logosDdb]);

    // Show the AppSync API Id and API Key in the output
    ctx.stack.addOutputs({
        ApiId: graphqlApi.apiId,
        ApiKey: graphqlApi.cdk.graphqlApi.apiKey || 'no-key',
        ApiUrl: graphqlApi.url,
        DomainUrl: `https://${stage}-graphql.${process.env.HOSTED_ZONE_DOMAIN}/graphql`,
    });

    return {
        graphqlApi,
    };
}
