"use client";

import { Icons } from '../ui/Icons';
import { Button } from '@/components/ui/button';
import InputBox from '@/components/ui/InputBox';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreateUserForm, CreateUserFormSchema } from '@/types/auth.type';
import { LoginSchema } from '@/types/user.type';
import { prettifyError } from 'zod';


const AuthForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlMode = searchParams.get('tab');
    const initialMode = urlMode === 'sign-up' ? 'signup' : 'login';
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState<CreateUserForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        setError('');
        setSuccess('');
    }, [mode]);

    const updateFormData = (field: keyof CreateUserForm, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true)

        try {
            if (mode === 'signup') {
                const result = CreateUserFormSchema.safeParse(formData);
                if (!result.success) {
                    setError(prettifyError(result.error));
                    return;
                }

                const { confirmPassword, ...userData } = result.data

                const res = await fetch("/api/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!res.ok) {
                    setError(`Failed to Create user : ${res.statusText}`)
                }
                setSuccess('Account created successfully! Please login.');
                setMode("login")

            } else {
                const result = LoginSchema.body.safeParse(formData);
                if (!result.success) {
                    setError(prettifyError(result.error));
                    return;
                }

                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    }),
                });

                if (!res.ok) {
                    setError(`Login failed: ${res.statusText}`);
                    return;
                }
                setSuccess('Login successful!');
                router.push("/dashboard")
            }

        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }

    };

    const handleForgotPassword = async () => {
        //TODO: Implement forget password flow
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google OAuth login functionality
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-800 mb-2">
                    {mode === 'login'
                        ? 'Welcome Back'
                        : 'Create your account'}
                </h1>
                <p className="text-neutral-600">
                    {mode === 'login'
                        ? 'Sign in to continue'
                        : 'Sign up to get started'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                        {success}
                    </div>
                )}

                {mode === 'signup' && (
                    <InputBox
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        disabled={loading}
                    />
                )}

                <InputBox
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    disabled={loading}
                />
                <InputBox
                    label="Password"
                    type="password"
                    placeholder={
                        mode === 'login'
                            ? "Enter your password"
                            : "Create a password"
                    }
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    disabled={loading}
                />
                {mode === 'signup' && (
                    <InputBox
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        disabled={loading}
                    />
                )}

                {mode === 'login' && (
                    <div className="text-right">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            disabled={loading}
                            className="text-sm text-orange-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}

                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading
                        ? (mode === 'login' ? 'Signing In...' : 'Processing...')
                        : (mode === 'login' ? 'Sign In' : 'Continue')
                    }
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-neutral-500">Or continue with</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleGoogleLogin}
                >
                    <Icons.google />
                    Continue with Google
                </Button>

            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-orange-600 font-medium hover:underline"
                    >
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;