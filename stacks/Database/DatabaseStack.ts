import { StackContext, Table } from '@serverless-stack/resources';

export function DatabaseStack(ctx: StackContext) {
    const logosDdb = new Table(ctx.stack, 'ddb-logos', {
        fields: {
            pk: 'string',
            sk: 'string',
        },
        primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    });

    return {
        logosDdb,
    };
}
