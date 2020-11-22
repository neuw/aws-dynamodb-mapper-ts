import {attribute, autoGeneratedHashKey, hashKey, table,} from '@aws/dynamodb-data-mapper-annotations';
import {Role} from '../models/Role';
import {Metadata} from '../models/Metadata';

@table('users')
export class User {

    @autoGeneratedHashKey()
    @hashKey({ // this is normal hash key (shared by table and of LSI)
        indexKeyConfigurations:{
            ItemIdIndex: 'HASH' // the value is the key type ('HASH' or 'RANGE')
        }
    })
    id: string;

    @attribute()
    email: string;

    @attribute()
    role: Role;

    @attribute()
    metadata: Metadata;

}

