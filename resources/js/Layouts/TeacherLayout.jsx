import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Home, FileText, User, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TeacherLayout({ children, user = { name: 'User', email: 'user@example.com' } }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const navigation = [
        { name: 'Dashboard', href: route('teacher.dashboard'), icon: Home },
        { name: 'IPCRF Tool', href: route('teacher.ipcrf'), icon: FileText },
    ];

    const isActive = (href) => {
        return window.location.pathname === new URL(href).pathname;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-100">
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 z-[45] transition-opacity duration-300 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Toggle Button - Enhanced */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`fixed top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white shadow-xl rounded-r-2xl transition-all duration-300 group border-y border-r border-green-200/50 ${
                    sidebarOpen ? 'left-72' : 'left-0'
                }`}
                style={{ padding: '24px 14px' }}
            >
                {sidebarOpen ? (
                    <ChevronLeft className="h-6 w-6 text-green-600 group-hover:text-green-700 transition-colors" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-green-600 group-hover:text-green-700 transition-colors" />
                )}
            </button>

            {/* Sidebar Drawer - Slides from left */}
            <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-white via-white to-green-50/30 backdrop-blur-xl shadow-2xl border-r border-green-200/50 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Logo Section - Enhanced */}
                    <div className="relative p-6 border-b border-green-200/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"></div>
                        
                        <div className="relative flex items-center gap-4">
                            <div className="relative group">
                                {/* Animated glow effect */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative bg-white rounded-full p-1 shadow-lg ring-2 ring-green-500/30">
                                    <img 
                                        src="/pictures/isat 1.jpg" 
                                        alt="ISAT Logo" 
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-emerald-600">
                                    ISAT DMS
                                </h2>
                                <p className="text-xs text-gray-600 font-semibold mt-0.5">Teacher Portal</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation - Enhanced */}
                    <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-3">Menu</p>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                                        active
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700'
                                    }`}
                                >
                                    {/* Active indicator */}
                                    {active && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                                    )}
                                    
                                    <div className={`p-2 rounded-lg transition-colors ${
                                        active 
                                            ? 'bg-white/20' 
                                            : 'bg-gray-100 group-hover:bg-green-100'
                                    }`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-semibold text-sm">{item.name}</span>
                                    
                                    {/* Hover arrow */}
                                    {!active && (
                                        <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section - Enhanced */}
                    <div className="p-5 border-t border-green-200/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                        <div className="relative">
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/80 transition-all duration-200 hover:shadow-md group"
                            >
                                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0 ring-2 ring-green-500/30 group-hover:ring-green-500/50 transition-all">
                                    {user.photo ? (
                                        <img
                                            src={`/storage/${user.photo}`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-xl font-bold text-white">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                </div>
                                <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showUserDropdown ? 'rotate-90' : ''}`} />
                            </button>

                            {/* User Dropdown - Enhanced */}
                            {showUserDropdown && (
                                <>
                                    <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setShowUserDropdown(false)}
                                    ></div>
                                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-2xl border border-green-200/50 py-2 z-20 animate-in slide-in-from-bottom-2 duration-200 overflow-hidden">
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                                            onClick={() => {
                                                setShowUserDropdown(false);
                                                setSidebarOpen(false);
                                            }}
                                        >
                                            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-green-100 transition-colors">
                                                <Settings className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">Profile Settings</span>
                                        </Link>
                                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>
                                        <button
                                            onClick={() => {
                                                setShowUserDropdown(false);
                                                setSidebarOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 transition-all duration-200 text-left group"
                                        >
                                            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                                                <LogOut className="h-4 w-4 text-red-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-red-600">Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div>
                {/* Page Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
