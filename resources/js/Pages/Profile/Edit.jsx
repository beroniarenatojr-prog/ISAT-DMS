import TeacherLayout from '@/Layouts/TeacherLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateProfilePhotoForm from './Partials/UpdateProfilePhotoForm';
import { User, Lock, Trash2, Camera, Shield, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ mustVerifyEmail, status, auth }) {
    const [photoPreview, setPhotoPreview] = useState(null);
    
    const displayPhoto = photoPreview || (auth.user.photo ? `/storage/${auth.user.photo}` : null);

    return (
        <TeacherLayout user={auth.user}>
            <Head title="Profile Settings" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Page Header with Breadcrumb */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>Settings</span>
                            <span>/</span>
                            <span className="text-green-600 font-medium">Profile</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    Profile Settings
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Manage your account information and security preferences
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Photo */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                                <div className="bg-gradient-to-br from-green-600 to-green-700 px-6 py-8 text-center">
                                    <div className="inline-block relative mb-4">
                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-white ring-4 ring-white/30 shadow-xl mx-auto">
                                            {displayPhoto ? (
                                                <img
                                                    src={displayPhoto}
                                                    alt={auth.user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                                                    <span className="text-5xl font-bold text-green-600">
                                                        {auth.user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{auth.user.name}</h3>
                                    <p className="text-green-100 text-sm">{auth.user.email}</p>
                                </div>
                                <div className="p-6">
                                    <UpdateProfilePhotoForm
                                        user={auth.user}
                                        onPhotoPreview={setPhotoPreview}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Information Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="border-b border-gray-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2.5 rounded-xl">
                                            <User className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">Update your name and email address</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50/50">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </div>
                            </div>

                            {/* Update Password Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="border-b border-gray-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2.5 rounded-xl">
                                            <Lock className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Security</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50/50">
                                    <UpdatePasswordForm />
                                </div>
                            </div>

                            {/* Delete Account Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="border-b border-red-100 px-6 py-5 bg-red-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2.5 rounded-xl">
                                            <Trash2 className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
                                            <p className="text-sm text-red-600 mt-0.5">Irreversible actions that affect your account</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <DeleteUserForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}
