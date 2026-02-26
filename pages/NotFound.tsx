import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
            <SEOHead
                title="404 — Page Not Found | CodeRed"
                description="The page you're looking for doesn't exist or has been moved."
                canonicalPath="/404"
            />

            {/* Animated grid background */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#DC143C 1px, transparent 1px), linear-gradient(90deg, #DC143C 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
                aria-hidden="true"
            />

            {/* Glowing orb */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #DC143C 0%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse404 4s ease-in-out infinite',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 text-center max-w-xl mx-auto">
                {/* Glitchy 404 */}
                <div className="relative mb-8">
                    <h1
                        className="text-[10rem] md:text-[14rem] font-black leading-none text-transparent select-none"
                        style={{
                            WebkitTextStroke: '2px rgba(220, 20, 60, 0.3)',
                        }}
                        aria-hidden="true"
                    >
                        404
                    </h1>
                    <h1
                        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none text-codered-500 flex items-center justify-center"
                        style={{
                            animation: 'glitch404 3s ease-in-out infinite',
                        }}
                    >
                        404
                    </h1>
                </div>

                {/* Terminal-style message */}
                <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 mb-8 text-left mx-auto max-w-md">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
                        <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
                        <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
                        <span className="text-xs text-gray-600 ml-2 font-mono">terminal</span>
                    </div>
                    <div className="font-mono text-sm space-y-2">
                        <p className="text-gray-500">
                            <span className="text-codered-500">$</span> curl corered.co.ke/this-page
                        </p>
                        <p className="text-yellow-500">
                            ⚠ Error 404: Page not found
                        </p>
                        <p className="text-gray-500">
                            <span className="text-codered-500">$</span> <span className="animate-pulse">█</span>
                        </p>
                    </div>
                </div>

                <p className="text-gray-400 mb-8 text-lg">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        id="btn-404-home"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-codered-500 hover:bg-codered-600 text-white font-bold rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-codered-500/20"
                    >
                        <Home className="w-5 h-5" aria-hidden="true" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        id="btn-404-back"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-lg border border-gray-700 transition-all cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                        Go Back
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes glitch404 {
                    0%, 100% { transform: translate(0, 0); opacity: 1; }
                    10% { transform: translate(-3px, -2px); }
                    20% { transform: translate(3px, 2px); }
                    30% { transform: translate(0, 0); }
                    40% { transform: translate(-2px, 1px); opacity: 0.8; }
                    50% { transform: translate(2px, -1px); }
                    60% { transform: translate(0, 0); opacity: 1; }
                    92% { transform: translate(0, 0); }
                    94% { transform: translate(-4px, -2px); opacity: 0.7; }
                    96% { transform: translate(4px, 2px); }
                    98% { transform: translate(-2px, 1px); opacity: 0.9; }
                }
                @keyframes pulse404 {
                    0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.15); }
                }
            `}</style>
        </div>
    );
};

export default NotFound;
