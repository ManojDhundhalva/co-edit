import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $firstName: String!, 
    $lastName: String!, 
    $userName: String!, 
    $email: String!, 
    $password: String!
  ) {
    registerUser(
      firstName: $firstName, 
      lastName: $lastName, 
      userName: $userName, 
      email: $email, 
      password: $password
    ) {
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser(
    $emailOrUserName: String!, 
    $password: String!
  ) {
    loginUser(
      emailOrUserName: $emailOrUserName, 
      password: $password
    ) {
      message
    }
  }
`;
