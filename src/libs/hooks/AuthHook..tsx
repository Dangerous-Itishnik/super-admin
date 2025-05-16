// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADMIN_LOGIN } from '../graphql/mutations/users';

interface AdminLoginResponse {
    adminLogin: {
        token: string;
        admin: {
            id: string;
            email: string;
        };
    };
}

interface AdminLoginVariables {
    email: string;
    password: string;
}

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const [loginMutation, { loading: loginLoading }] = useMutation<
        AdminLoginResponse,
        AdminLoginVariables
    >(ADMIN_LOGIN);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await loginMutation({
                variables: { email, password },
            });

            if (data?.adminLogin.token) {
                localStorage.setItem('adminToken', data.adminLogin.token);
                setIsAuthenticated(true);
                router.push('/users');
                return { success: true };
            }
            return { success: false, error: 'Authentication failed' };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        router.push('/auth/signin');
    };

    return {
        isAuthenticated,
        isLoading,
        loginLoading,
        login,
        logout,
    };
};