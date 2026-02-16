<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|email',
            'password' => 'required|string',
        ]);

        \Log::info('Login attempt', ['email' => $credentials['username']]);

        // Check if user exists
        $user = \App\Models\User::where('email', $credentials['username'])->first();
        
        if (!$user) {
            \Log::info('User not found');
            return back()->withErrors([
                'username' => 'No user found with this email.',
            ])->onlyInput('username');
        }

        \Log::info('User found', ['role' => $user->role]);

        // Check password
        if (!\Hash::check($credentials['password'], $user->password)) {
            \Log::info('Password mismatch');
            return back()->withErrors([
                'username' => 'Password is incorrect.',
            ])->onlyInput('username');
        }

        // Try to login with email field
        if (Auth::attempt(['email' => $credentials['username'], 'password' => $credentials['password']], $request->boolean('remember'))) {
            // Check if user has admin role
            if (Auth::user()->role === 'admin') {
                $request->session()->regenerate();
                \Log::info('Admin login successful');
                return redirect()->intended(route('admin.dashboard'));
            }
            
            // Not an admin, logout
            Auth::logout();
            \Log::info('User is not admin');
            return back()->withErrors([
                'username' => 'You do not have admin access.',
            ])->onlyInput('username');
        }

        \Log::info('Auth attempt failed');
        return back()->withErrors([
            'username' => 'Authentication failed.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('admin.login');
    }
}
