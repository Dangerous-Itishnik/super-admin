'use client'
import React, { useState } from 'react';
import {useAuth} from "@/libs/hooks/AuthHook.";


const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('igorgrime@gmail.com');
    const [password, setPassword] = useState('Ex4mple!');
    const [error, setError] = useState('');
    const { login, loginLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);
        if (!result.success) {
            setError(result.error || 'Authentication failed');
        }
    };

    return (
        <div >
            <div >
                <h1 >Super Admin Panel</h1>

                {error && (
                    <div >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loginLoading}
                        >
                            {loginLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;