import UserService from "../../services/userService";
import { RegisterPayload, LoginPayload } from "../../interfaces/auth";
import { Request, Response } from "express";

export const userResolvers = {
    Query: {
        getUser: async (_: unknown, { id }: { id: string }) => {
            try {
                const user = await UserService.getUserById(id);
                return user;
            } catch (error) {
                const err = error as Error;
                throw new Error(`Failed to fetch user with ID ${id}: ${err.message}`);
            }
        },
    },
    Mutation: {
        registerUser: async (_: unknown, payload: RegisterPayload) => {
            try {
                const response = await UserService.register(payload);
                return response;
            } catch (error) {
                const err = error as Error;
                throw new Error(`Registration failed: ${err.message}`);
            }
        },
        loginUser: async (_: unknown, payload: LoginPayload, { req, res }: { req: Request; res: Response }) => {
            try {
                const response = await UserService.login(payload, req, res);
                return response;
            } catch (error) {
                const err = error as Error;
                throw new Error(`Login failed: ${err.message}`);
            }
        }
    },
};
