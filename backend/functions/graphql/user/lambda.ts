import User from './User';
import list from './list';
import create from './create';
import update from './update';
import deleteUser from './deleteUser';
import getUser from './getUser';

type AppSyncEvent = {
    info: {
        fieldName: string;
    };
    arguments: {
        user: User;
        pk: string;
        sk: string;
    };
};

export async function handler(event: AppSyncEvent): Promise<Record<string, unknown>[] | User | string | null | undefined> {
    switch (event.info.fieldName) {
        case 'listUsers':
            return await list();
        case 'createUser':
            return await create(event.arguments.user);
        case 'updateUser':
            return await update(event.arguments.user);
        case 'deleteUser':
            return await deleteUser(event.arguments.user);
        case 'getUser':
            return await getUser(event.arguments.user);
        default:
            return null;
    }
}
