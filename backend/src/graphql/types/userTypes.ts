import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  # User type definition
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    userName: String!
    createdAt: String!
    updatedAt: String!
  }
  
  type Acknowledgement {
    message: String!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ): Acknowledgement!
    
    loginUser(
      emailOrUserName: String!
      password: String!
    ): Acknowledgement!
  }
`;
