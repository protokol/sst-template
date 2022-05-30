import { StackContext, Api, use } from '@serverless-stack/resources';
import { DatabaseStack } from '../Database/DatabaseStack';

export function RestApiStack(ctx: StackContext) {
    const db = use(DatabaseStack);
    const stage = ctx.app.stage;

    const restApi = new Api(ctx.stack, 'UserApi', {
        customDomain: {
            domainName: `${stage}-rest.${process.env.HOSTED_ZONE_DOMAIN}`,
            hostedZone: `${process.env.HOSTED_ZONE_DOMAIN}`,
        },
        defaults: {
            function: {
                permissions: [db.logosDdb],
                environment: {
                    LOGOS_DDB: db.logosDdb.tableName,
                },
            },
        },
        routes: {
            'GET   /users': 'functions/rest/user/list.handler',
            'ANY   /': 'functions/rest/any.handler',
        },
    });

    // Show the API endpoint in the output
    ctx.stack.addOutputs({
        ApiEndpoint: restApi.url,
    });

    return {
        restApi,
    };
}
