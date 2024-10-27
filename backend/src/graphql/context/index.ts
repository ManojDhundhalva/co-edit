import { Request, Response } from 'express';
import { verifyTokenAndAuthorization } from '../../utils/authUtils';
import { TokenPayload } from '../../interfaces/auth';

const context = async ({ req, res }: { req: Request, res: Response }) => {

  const { operationName } = req.body;
  if (operationName === 'LoginUser' || operationName === 'RegisterUser' || operationName === "IntrospectionQuery") {
    return { req, res };
  }

  try {
    const decodedToken: TokenPayload = verifyTokenAndAuthorization(req);
    return { req, res, user: { id: decodedToken.id, userName: decodedToken.userName } };
  } catch (error) {
    throw new Error('You are not authenticated.');
  }
};

export default context;
