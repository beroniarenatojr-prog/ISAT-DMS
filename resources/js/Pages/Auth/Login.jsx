import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, Eye, EyeOff, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src="/pictures/pic2.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-gray-900/80 to-slate-900/85"></div>
                    {/* Subtle Overlay Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>
                </div>

                <div className="max-w-6xl w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Logo and Branding */}
                        <div className="text-center lg:text-left space-y-6">
                            <div className="flex justify-center lg:justify-start">
                                <div className="relative group">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
                                    <div className="relative bg-white rounded-full p-3 shadow-2xl">
                                        <img 
                                            src="/pictures/isat 1.jpg" 
                                            alt="ISAT Logo" 
                                            className="h-32 w-32 rounded-full object-cover ring-4 ring-white/50 transform transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-3 shadow-xl ring-4 ring-white/30 transform transition duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        <LogIn className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
                                    Welcome Back
                                </h1>
                                <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-3 border border-white/20">
                                    <p className="text-base font-semibold text-white">
                                        ISAT Document Management System
                                    </p>
                                </div>
                                <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
                                    Sign in to continue your journey and access your performance dashboard
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="space-y-6">

                    {/* Login Card */}
                    <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 space-y-6 border-2 border-white/40 relative overflow-hidden">
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-tr-full"></div>
                        {status && (
                            <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-xl shadow-sm animate-fade-in">
                                <div className="absolute inset-0 bg-green-500/5 rounded-xl"></div>
                                <p className="relative text-sm font-semibold text-green-800 flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    {status}
                                </p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6 relative">
                            {/* Email Field */}
                            <div className="relative group">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-300 transition-colors" />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="peer pl-12 pr-4 block w-full rounded-2xl border-0 bg-white/10 backdrop-blur-md shadow-sm focus:bg-white/15 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 h-16 text-base text-white placeholder:text-gray-400"
                                        autoComplete="username"
                                        isFocused={true}
                                        placeholder="Email Address"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2 ml-1 text-red-400 animate-shake" />
                            </div>

                            {/* Password Field */}
                            <div className="relative group">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-300 transition-colors" />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="peer pl-12 pr-14 block w-full rounded-2xl border-0 bg-white/10 backdrop-blur-md shadow-sm focus:bg-white/15 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 h-16 text-base text-white placeholder:text-gray-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-300 transition-colors z-10"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2 ml-1 text-red-400 animate-shake" />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-700/30">
                                <label className="flex items-center group cursor-pointer px-2 py-2 transition-all">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded-md border-2 border-gray-400 text-green-500 shadow-sm focus:ring-green-500 focus:ring-2 transition-all w-5 h-5 bg-transparent"
                                    />
                                    <span className="ml-3 text-sm font-semibold text-white group-hover:text-gray-200 transition-colors">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors hover:underline underline-offset-2"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full flex justify-center items-center gap-3 py-4 px-6 border-2 border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-size-200 bg-pos-0 hover:bg-pos-100 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/30 active:scale-[0.98] overflow-hidden"
                                >
                                    {/* Animated Background Shine */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                    
                                    {/* Glow Effect */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-400 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="relative">Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative">Sign In to Continue</span>
                                            <LogIn className="relative h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Security Badge */}
                        <div className="relative pt-8">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            <div className="flex items-center justify-center gap-2 text-sm text-white py-4 px-6">
                                <Shield className="h-5 w-5 text-green-400" />
                                <span className="font-semibold">Protected by ISAT DMS Security</span>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center space-y-2 mt-8 lg:col-span-2">
                        <p className="text-sm text-white/90 font-medium">
                            © {new Date().getFullYear()} ISAT Document Management System
                        </p>
                        <p className="text-xs text-white/60">
                            All rights reserved
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .bg-size-200 {
                    background-size: 200%;
                }
                .bg-pos-0 {
                    background-position: 0%;
                }
                .bg-pos-100 {
                    background-position: 100%;
                }
            `}</style>
        </>
    );
}
