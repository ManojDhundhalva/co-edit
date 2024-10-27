import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../mutations/auth';
import { toast } from 'react-hot-toast';

// Hook for login
export const useLogin = () => {
    const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            const message = data.loginUser.message;
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { loginUser, loading };
};

// Hook for registration
export const useRegister = () => {
    const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
            const message = data.registerUser.message;
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });


    return { registerUser, loading };
};