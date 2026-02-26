import React, { useState, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import { Terminal as TerminalIcon, Shield, Cpu, Activity } from 'lucide-react';

const Hero: React.FC = () => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-container min-h-screen relative flex items-center justify-center overflow-hidden bg-black-primary" id="hero">
            {/* Background 3D Canvas */}
            <HeroBackground />

            {/* Layered Effects */}
            <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                {/* Layer 1: Scanline Overlay */}
                <div className="scanline-overlay pointer-events-none absolute inset-0 z-20"></div>

                {/* Layer 2: Matrix Code Rain (Simplified CSS version or could be canvas) */}
                <div className="matrix-code-rain pointer-events-none absolute inset-0 z-5 opacity-10"></div>

                {/* Layer 3: Main Content */}
                <div className="hero-main flex flex-col items-center">
                    {/* Pre-Text Animation */}
                    <div className="hero-pretitle mb-8 flex items-center gap-2 font-code text-cyan-primary animate-fade-in">
                        <span className="text-red-primary">[</span>
                        <span className="system-init text-white-secondary tracking-widest uppercase text-sm">System Initializing...</span>
                        <span className="text-red-primary">]</span>
                    </div>

                    {/* Loading Bar */}
                    {!loadingComplete ? (
                        <div className="loading-bar w-72 h-1 bg-black-secondary border border-red-primary rounded-sm mb-12 relative overflow-hidden shadow-glow-red">
                            <div className="loading-fill h-full bg-gradient-to-r from-red-primary via-cyan-primary to-red-primary animate-loading-fill shadow-glow-red"></div>
                            <span className="loading-text absolute -top-7 left-0 font-code text-[10px] text-white-tertiary tracking-widest uppercase">
                                Accessing CodeRedSecurity.net
                            </span>
                        </div>
                    ) : (
                        <div className="mb-12 h-1 invisible"></div>
                    )}

                    {/* Main Title with Glitch */}
                    <div className="hero-title-wrapper relative mb-8 group">
                        <h1 className="hero-title text-6xl md:text-9xl font-black tracking-widest leading-none text-white-primary flex items-center gap-4 transition-all duration-500 group-hover:scale-105">
                            <span className="title-line-1">DERRICK</span>
                            <span className="title-divider text-red-primary animate-pulse">█</span>
                            <span className="title-line-2">NDAIRE</span>
                        </h1>

                        {/* Glitch Clone Elements */}
                        <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-60 transition-opacity">
                            <h1 className="hero-title text-6xl md:text-9xl font-black tracking-widest leading-none text-red-primary absolute inset-0 translate-x-[-2px] translate-y-[2px] animate-glitch-1">
                                <span>DERRICK</span>
                                <span>█</span>
                                <span>NDAIRE</span>
                            </h1>
                            <h1 className="hero-title text-6xl md:text-9xl font-black tracking-widest leading-none text-cyan-primary absolute inset-0 translate-x-[2px] translate-y-[-2px] animate-glitch-2">
                                <span>DERRICK</span>
                                <span>█</span>
                                <span>NDAIRE</span>
                            </h1>
                        </div>
                    </div>

                    {/* Subtitle with Terminal Style */}
                    <div className="hero-subtitle mb-10 font-code text-xl md:text-3xl font-bold flex items-center">
                        <span className="text-cyan-primary mr-2">[</span>
                        <span className="code-status text-green-success text-shadow-glow-green">CODEREDSECURITY.EXE</span>
                        <span className="text-cyan-primary ml-2">]</span>
                    </div>

                    {/* Info Lines */}
                    <div className="hero-info flex flex-col gap-3 mb-12 font-code text-sm md:text-base text-white-secondary">
                        <div className="info-line flex items-center transition-all hover:translate-x-2">
                            <span className="status-indicator online text-green-success mr-3 animate-pulse">●</span>
                            <span>Status: SYSTEM ONLINE</span>
                        </div>
                        <div className="info-line flex items-center transition-all hover:translate-x-2">
                            <Activity className="w-4 h-4 text-cyan-primary mr-3" />
                            <span>Role: System Architect | Protocol Specialist</span>
                        </div>
                        <div className="info-line flex items-center transition-all hover:translate-x-2">
                            <Shield className="w-4 h-4 text-red-primary mr-3" />
                            <span>Threat Level: <span className="text-red-primary font-bold">INNOVATIVE</span></span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-cta flex flex-wrap gap-6 justify-center">
                        <button className="btn group px-8 py-4 border-2 border-red-primary text-red-primary font-code font-bold rounded flex items-center gap-3 transition-all hover:bg-red-primary/10 hover:shadow-glow-red hover:scale-105 active:scale-95">
                            <span className="text-white-secondary">[</span>
                            <span className="btn-text">INITIALIZE PROTOCOL</span>
                            <span className="text-white-secondary">]</span>
                        </button>

                        <button className="btn group px-8 py-4 border-2 border-cyan-primary text-cyan-primary font-code font-bold rounded flex items-center gap-3 transition-all hover:bg-cyan-primary/10 hover:shadow-glow-cyan hover:scale-105 active:scale-95">
                            <span className="text-white-secondary">[</span>
                            <span className="btn-text">VIEW OPERATIONS</span>
                            <span className="text-white-secondary">]</span>
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                    <span className="scroll-text font-code text-[10px] tracking-widest text-white-tertiary uppercase">Scroll to Continue</span>
                    <div className="scroll-arrow text-2xl text-red-primary">↓</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
