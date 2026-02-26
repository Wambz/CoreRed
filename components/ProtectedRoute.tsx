import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        // Listen for auth state changes (login / logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
            setSession(sess);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Still loading auth state
    if (session === undefined) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-codered-500 animate-spin" />
            </div>
        );
    }

    // Not authenticated — redirect to login
    if (session === null) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
