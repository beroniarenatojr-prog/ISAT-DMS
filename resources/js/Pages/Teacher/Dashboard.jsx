import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function TeacherDashboard({ user }) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Teacher Dashboard" />
            
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img 
                                src="/pictures/isat.tmp" 
                                alt="ISAT" 
                                className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">ISAT DMS</h1>
                                <p className="text-sm text-gray-600">Teacher Portal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-600">{user.email}</p>
                            </div>
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
                        <p className="text-gray-600">
                            This is your teacher dashboard. You can manage your classes, students, and assignments here.
                        </p>
                        
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href={route('teacher.ipcrf')} className="bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">IPCRF Tool</h3>
                                <p className="text-3xl font-bold text-blue-600">📋</p>
                                <p className="text-sm text-blue-700 mt-2">Submit your performance documents</p>
                            </Link>
                            
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">Students</h3>
                                <p className="text-3xl font-bold text-green-600">0</p>
                                <p className="text-sm text-green-700 mt-2">Total students</p>
                            </div>
                            
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-purple-900 mb-2">Assignments</h3>
                                <p className="text-3xl font-bold text-purple-600">0</p>
                                <p className="text-sm text-purple-700 mt-2">Pending assignments</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
