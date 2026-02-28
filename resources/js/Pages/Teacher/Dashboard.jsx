import { Head } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { FileText, ArrowRight, Target, TrendingUp, Award, CheckCircle2, Clock, BarChart3, Upload, Eye, Sparkles, Zap, ArrowDown } from 'lucide-react';

export default function TeacherDashboard({ user }) {
    return (
        <TeacherLayout user={user}>
            <Head title="Teacher Dashboard" />
            
            {/* Hero Section */}
            <div className="min-h-screen relative overflow-hidden">
                {/* Background Image */}
                <div className="fixed inset-0 z-0">
                    <img 
                        src="/pictures/pic2.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-gray-900/85 to-slate-900/90"></div>
                </div>
                
                {/* Content wrapper */}
                <div className="relative z-10">
                    {/* Static Gradient Orbs */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-400/30 via-emerald-400/20 to-teal-400/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-green-500/20 via-emerald-500/30 to-teal-500/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-300/10 via-emerald-300/10 to-teal-300/10 rounded-full blur-3xl"></div>
                    
                    {/* Static Floating Geometric Shapes */}
                    <div className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-green-400/40 to-emerald-400/40 rounded-2xl rotate-12 blur-sm shadow-lg"></div>
                    <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-teal-400/30 to-green-400/30 rounded-full blur-sm shadow-lg"></div>
                    <div className="absolute bottom-1/4 right-32 w-28 h-28 bg-gradient-to-br from-emerald-400/40 to-teal-400/40 rounded-2xl -rotate-12 blur-sm shadow-lg"></div>
                    <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-sm shadow-lg"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-teal-400/30 to-green-400/30 rounded-2xl rotate-45 blur-sm shadow-lg"></div>
                    
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
                                         linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                    
                    {/* Radial Gradient Overlay */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.1) 100%)'
                    }}></div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        {/* ISAT Logo Only */}
                        <div className="inline-flex items-center justify-center mb-6">
                            <img src="/pictures/isat 1.jpg" alt="ISAT" className="h-20 w-20 rounded-full object-cover shadow-xl ring-4 ring-green-500/30" />
                        </div>
                        
                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-400 animate-pulse">{user.name.split(' ')[0]}</span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
                            Your journey to excellence starts here. Let's make today count.
                        </p>
                    </div>

                    {/* Main CTA Card - MOVED TO TOP */}
                    <div className="max-w-4xl mx-auto mb-10">
                        <a href={route('teacher.ipcrf')} className="block group">
                            <div className="relative bg-gradient-to-br from-green-600 via-green-500 to-green-600 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-green-500/50 border-4 border-green-400">
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="relative p-8 sm:p-12">
                                    <div className="flex flex-col lg:flex-row items-center gap-8">
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-28 h-28 bg-white/30 backdrop-blur-sm rounded-3xl flex items-center justify-center ring-4 ring-white/50 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                                <FileText className="h-14 w-14 text-white" />
                                            </div>
                                        </div>
                                        
                                        {/* Text Content */}
                                        <div className="flex-1 text-center lg:text-left">
                                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
                                                IPCRF Management
                                            </h2>
                                            <p className="text-lg text-white mb-2 font-bold">
                                                Your Professional Development Dashboard
                                            </p>
                                            <p className="text-base text-white/95 max-w-2xl">
                                                Everything you need to document achievements, submit evidence, and elevate your teaching career.
                                            </p>
                                        </div>
                                        
                                        {/* CTA Button */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-white text-green-600 px-10 py-5 rounded-2xl font-extrabold text-xl shadow-2xl flex items-center gap-4 group-hover:bg-yellow-300 group-hover:text-green-700 transition-all duration-300 group-hover:gap-6 group-hover:shadow-yellow-300/50">
                                                <span>Launch Now</span>
                                                <ArrowRight className="h-6 w-6 animate-[slideRight_2s_ease-in-out_infinite]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="flex justify-center mb-10">
                        <div className="flex flex-col items-center gap-2 text-green-600">
                            <span className="text-sm font-medium animate-bounce">Learn More Below</span>
                            <ArrowDown className="h-5 w-5 animate-bounce" />
                        </div>
                    </div>

                    {/* Quick Action Banner */}
                    <div className="max-w-5xl mx-auto mb-10">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl border-2 border-blue-400">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-3 rounded-xl">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Quick Start Guide</h3>
                                        <p className="text-blue-100 text-sm">Follow these simple steps to get started</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <p className="text-white font-bold text-sm">3 Easy Steps</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step-by-Step Guide */}
                    <div className="max-w-5xl mx-auto mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-green-500 to-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white">
                                    1
                                </div>
                                <div className="mt-4">
                                    <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                        <Upload className="h-7 w-7 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Open IPCRF Tool</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">
                                        Click the green button below to access your performance dashboard
                                    </p>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <p className="text-xs text-green-700 font-medium text-center">
                                            Takes 2 seconds
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white">
                                    2
                                </div>
                                <div className="mt-4">
                                    <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                        <FileText className="h-7 w-7 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Upload Evidence</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">
                                        Submit your documents and evidence for each objective
                                    </p>
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                        <p className="text-xs text-purple-700 font-medium text-center">
                                            PDF files accepted
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white">
                                    3
                                </div>
                                <div className="mt-4">
                                    <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                        <Eye className="h-7 w-7 text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Track Progress</h3>
                                    <p className="text-sm text-gray-600 text-center mb-4">
                                        Monitor your ratings and feedback from administrators
                                    </p>
                                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                        <p className="text-xs text-amber-700 font-medium text-center">
                                            Real-time updates
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="max-w-5xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Performance Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Performance Card */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-400">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                        <BarChart3 className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-100 font-medium">Current Rating</p>
                                        <p className="text-3xl font-bold text-white">--</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 rounded-lg p-3">
                                    <p className="text-xs text-white font-medium">Awaiting submissions</p>
                                </div>
                            </div>

                            {/* Submissions Card */}
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-purple-400">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-100 font-medium">Submitted</p>
                                        <p className="text-3xl font-bold text-white">0</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 rounded-lg p-3">
                                    <p className="text-xs text-white font-medium">Documents uploaded</p>
                                </div>
                            </div>

                            {/* Goals Card */}
                            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-amber-400">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-amber-100 font-medium">Total Goals</p>
                                        <p className="text-3xl font-bold text-white">14</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 rounded-lg p-3">
                                    <p className="text-xs text-white font-medium">Objectives to complete</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Use IPCRF Section */}
                    <div className="max-w-5xl mx-auto mb-10">
                        <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-8 border-2 border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Use the IPCRF Tool?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                                        <TrendingUp className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Track Growth</h3>
                                    <p className="text-sm text-gray-600">Monitor your professional development and see your progress in real-time</p>
                                </div>

                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                                        <Clock className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Save Time</h3>
                                    <p className="text-sm text-gray-600">Streamlined submission process makes documentation quick and easy</p>
                                </div>

                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                                        <Award className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Achieve Excellence</h3>
                                    <p className="text-sm text-gray-600">Reach your professional goals with structured performance management</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help Getting Started?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Our administrators are here to support you every step of the way. Don't hesitate to reach out if you have questions.
                            </p>
                            <div className="inline-flex items-center gap-2 text-green-400 font-semibold text-sm">
                                <Sparkles className="h-4 w-4" />
                                <span>Contact your administrator for guidance</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t-4 border-green-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-sm font-medium mb-2">
                            © {new Date().getFullYear()} ISAT Document Management System
                        </p>
                        <p className="text-xs text-gray-400">
                            Empowering educators through excellence
                        </p>
                    </div>
                </div>
            </footer>
        </TeacherLayout>
    );
}
