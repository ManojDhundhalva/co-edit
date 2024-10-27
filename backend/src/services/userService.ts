import { Request, Response } from 'express';
import { generateToken, generateHash, comparePassword } from "../utils/authUtils";
import { User, RegisterPayload, LoginPayload, Acknowledgement } from '../interfaces/auth';
import prisma from "../config/database"
import config from '../config';

class UserService {
    private static async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { email } });
    }

    private static async getUserByUserName(userName: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { userName } });
    }

    public static async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }

    public static async register(payload: RegisterPayload): Promise<Acknowledgement> {
        const { firstName, lastName, userName, email, password } = payload;

        if (!(firstName && lastName && userName && email && password)) {
            throw new Error('Missing required fields');
        }

        let existingUser: { id: string } | null = null;
        try {
            existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ userName }, { email }],
                },
                select: {
                    id: true,
                },
            });
        } catch (error) {
            throw new Error('Error checking for existing user');
        }

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await generateHash(password);

        try {
            await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: hashedPassword,
                },
            });
        } catch (error) {
            throw new Error('Error creating user');
        }
        return { message: 'User created successfully' };
    }

    public static async login(payload: LoginPayload, req: Request, res: Response): Promise<Acknowledgement> {
        const { emailOrUserName, password } = payload;
        const userAgent: string = req.headers['user-agent'] as string;
        const fingerprint: string = req.headers['x-fingerprint-id'] as string;

        if (!(emailOrUserName && password && userAgent && fingerprint)) {
            throw new Error('Missing required fields');
        }

        let user: { id: string, userName: string, password: string } | null = null;

        try {
            user = await prisma.user.findFirst({
                where: {
                    OR: [{ email: emailOrUserName }, { userName: emailOrUserName }],
                },
                select: {
                    id: true,
                    userName: true,
                    password: true,
                },
            });
        } catch (error) {
            throw new Error('Error during user lookup/login');
        }

        if (!user || !(await comparePassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user.id, user.userName, fingerprint, userAgent);

        res.cookie("authToken", token, {
            path: "/", // This allows the cookie to be accessible on all routes
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            secure: config.NODE_ENV === "production", // Use HTTPS in production
        });

        res.cookie("userName", user.userName, {
            path: "/", // This allows the cookie to be accessible on all routes
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            secure: config.NODE_ENV === "production", // Use HTTPS in production
        });

        return { message: 'Login successful' };
    }
}

export default UserService;
