import { RestApiStack } from './Api/RestApiStack';
import { GraphQLApiStack } from './Api/GraphQLApiStack';
import { DatabaseStack } from './Database/DatabaseStack';
import { App } from '@serverless-stack/resources';
import { RemovalPolicy } from 'aws-cdk-lib';
import 'dotenv/config';

export default function (app: App) {
    // Remove all resources when non-prod stages are removed
    if (app.stage !== 'prod') {
        app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
    }

    app.setDefaultFunctionProps({
        runtime: 'nodejs16.x',
        srcPath: 'backend',
        bundle: {
            format: 'esm',
        },
    });
    app.stack(DatabaseStack).stack(RestApiStack).stack(GraphQLApiStack);
}
