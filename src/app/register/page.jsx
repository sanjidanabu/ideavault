"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle, Circle, Loader2 } from 'lucide-react'; 
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation'; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [googleLoading, setGoogleLoading] = useState(false); 
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });

    const validation = {
        minChar: formData.password.length >= 6,
        hasUpper: /[A-Z]/.test(formData.password),
        hasLower: /[a-z]/.test(formData.password)
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/" 
            });
        } catch (err) {
            toast.error("Google Sign-In failed. Please try again.");
            console.error(err);
            setGoogleLoading(false);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const currentFormData = new FormData(e.currentTarget);
        const user = Object.fromEntries(currentFormData.entries());
        
        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.photoURL 
        });
      
        if(data){
            toast.success("Account created successfully! Redirecting...");
            setTimeout(() => {
                router.push('/login');
            }, 2000); 
        }

        if(error){
            toast.error(error.message || "Something went wrong! Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Join IdeaVault and start sharing your innovations
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                disabled={loading || googleLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all disabled:opacity-50"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={loading || googleLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all disabled:opacity-50"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Photo URL</label>
                            <input
                                name="photoURL"
                                type="url"
                                required
                                disabled={loading || googleLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all disabled:opacity-50"
                                placeholder="https://example.com/photo.jpg"
                                value={formData.photoURL}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Password</label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={loading || googleLoading}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all disabled:opacity-50"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                disabled={loading || googleLoading}
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password Requirements:</p>
                        <ValidationItem label="At least 6 characters" isValid={validation.minChar} />
                        <ValidationItem label="At least one uppercase letter" isValid={validation.hasUpper} />
                        <ValidationItem label="At least one lowercase letter" isValid={validation.hasLower} />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || googleLoading || !(validation.minChar && validation.hasUpper && validation.hasLower)}
                            className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    Registering...
                                </>
                            ) : (
                                'Register Now'
                            )}
                        </button>
                    </div>

                   
                    <div className="space-y-4">
                        <div className="relative flex items-center justify-center">
                            <div className="border-t border-gray-200 w-full"></div>
                            <span className="absolute bg-white px-3 text-xs text-gray-400 uppercase font-medium">Or continue with</span>
                        </div>

                        <button
                            type="button"
                            disabled={loading || googleLoading}
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            {googleLoading ? (
                                <Loader2 className="animate-spin text-gray-400" size={18} />
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.26 1.706 15.42 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.9H12.24z"/>
                                </svg>
                            )}
                            <span>Sign up with Google</span>
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-red-600 hover:text-red-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ValidationItem = ({ label, isValid }) => (
    <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-emerald-600' : 'text-gray-400'}`}>
        {isValid ? <CheckCircle size={16} /> : <Circle size={16} />}
        <span>{label}</span>
    </div>
);

export default RegisterPage;