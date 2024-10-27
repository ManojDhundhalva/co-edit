import { emailRegex } from './regex';

export const isValidEmail = (email: string): boolean => emailRegex.test(email);

export const isFormValid = (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    isEmailValid: boolean
): boolean => {
    return (
        firstName.trim() !== '' &&
        firstName.length < 255 &&
        lastName.trim() !== '' &&
        lastName.length < 255 &&
        userName.trim() !== '' &&
        userName.length < 255 &&
        email.trim() !== '' &&
        email.length < 255 &&
        isEmailValid &&
        password !== '' &&
        password.length >= 8 &&
        password.length < 255
    );
};
