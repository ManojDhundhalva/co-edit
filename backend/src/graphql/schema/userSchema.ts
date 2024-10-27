import { makeExecutableSchema } from '@graphql-tools/schema';
import { userTypeDefs } from '../types/userTypes';
import { userResolvers } from '../resolvers/userResolvers';

const userSchema = makeExecutableSchema({
    typeDefs: userTypeDefs,
    resolvers: userResolvers
});

export default userSchema;