import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/auth';

const saltRounds = 10;

export const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (id: string, userName: string, fingerprint: string, userAgent: string): string => {
    return jwt.sign({ id, userName, fingerprint, userAgent }, config.JWT_SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, config.JWT_SECRET_KEY) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export const verifyTokenAndAuthorization = (req: Request): TokenPayload => {
    const authToken = String(req.cookies?.authToken || "");
    const userName = String(req.cookies?.userName || "");
    const userAgent = String(req.headers['user-agent'] || "");
    const fingerprint = String(req.headers['x-fingerprint-id'] || "");

    if (!authToken || !userName || !userAgent || !fingerprint) {
        throw new Error('You are not authenticated.');
    }

    let user: TokenPayload;
    try {
        user = verifyToken(authToken) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid token.');
    }

    const isValidUser =
        user.userName === userName &&
        user.userAgent === userAgent &&
        user.fingerprint === fingerprint;

    if (!isValidUser) {
        throw new Error('You are not authorized.');
    }

    return user; // Return the validated user object
};
