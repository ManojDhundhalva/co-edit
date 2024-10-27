import { mergeSchemas } from '@graphql-tools/schema';
import userSchema from './userSchema';

const schema = mergeSchemas({ schemas: [userSchema] });

export default schema;
