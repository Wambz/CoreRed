import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
import SEOHead from '../../components/SEOHead';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });

        if (authErr) {
            setError(authErr.message);
            setLoading(false);
        }
        // On success, ProtectedRoute will detect the session change and redirect automatically
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <SEOHead title="Admin Login | CodeRed" description="Admin access" canonicalPath="/admin/login" />

            <div className="w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-codered-500/10 border border-codered-500/30 mb-4">
                        <Lock className="w-7 h-7 text-codered-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white">
                        Admin <span className="text-codered-500">Portal</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">CodeRed Innovations CMS</p>
                </div>

                {/* Card */}
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-8">
                    {error && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg mb-6 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors"
                                    placeholder="admin@coredredinnovations.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    id="admin-password"
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-codered-500 transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-codered-500 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wider"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-700 text-xs mt-6">
                    Restricted access — CoreRed Innovations staff only
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
