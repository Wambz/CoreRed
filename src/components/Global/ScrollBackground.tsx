import React, { useEffect, useRef } from 'react';

const ScrollBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (containerRef.current) {
                        const scrollY = window.scrollY;
                        const layers = containerRef.current.querySelectorAll<HTMLElement>('.parallax-layer');
                        layers.forEach((layer) => {
                            const speed = parseFloat(layer.dataset.speed || '0.1');
                            layer.style.transform = `translateY(${scrollY * speed}px)`;
                        });
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Generate random particle positions at build time
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 300,
        size: 1.5 + Math.random() * 3,
        opacity: 0.15 + Math.random() * 0.35,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
        isRed: Math.random() > 0.5,
        speed: 0.02 + Math.random() * 0.12,
    }));

    const gridLines = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        position: (i + 1) * (100 / 13),
    }));

    return (
        <div
            ref={containerRef}
            className="scroll-bg-container"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {/* Grid layer — slowest */}
            <div className="parallax-layer" data-speed="-0.03" style={{ position: 'absolute', inset: 0 }}>
                {gridLines.map((line) => (
                    <div
                        key={`v-${line.id}`}
                        style={{
                            position: 'absolute',
                            left: `${line.position}%`,
                            top: 0,
                            width: '1px',
                            height: '200%',
                            background: 'linear-gradient(to bottom, transparent, var(--red-transparent-30), transparent)',
                            opacity: 0.08,
                        }}
                    />
                ))}
                {gridLines.map((line) => (
                    <div
                        key={`h-${line.id}`}
                        style={{
                            position: 'absolute',
                            top: `${line.position}%`,
                            left: 0,
                            height: '1px',
                            width: '100%',
                            background: 'linear-gradient(to right, transparent, var(--red-transparent-30), transparent)',
                            opacity: 0.06,
                        }}
                    />
                ))}
            </div>

            {/* Particles — mid speed */}
            <div className="parallax-layer" data-speed="-0.06" style={{ position: 'absolute', inset: 0, height: '400%' }}>
                {particles.filter(p => !p.isRed).map((p) => (
                    <div
                        key={p.id}
                        className="float-particle"
                        style={{
                            position: 'absolute',
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            borderRadius: '50%',
                            background: 'var(--cyan-primary)',
                            opacity: p.opacity * 0.6,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                            boxShadow: `0 0 ${p.size * 2}px var(--cyan-primary)`,
                        }}
                    />
                ))}
            </div>

            {/* Particles — faster layer */}
            <div className="parallax-layer" data-speed="-0.1" style={{ position: 'absolute', inset: 0, height: '400%' }}>
                {particles.filter(p => p.isRed).map((p) => (
                    <div
                        key={p.id}
                        className="float-particle"
                        style={{
                            position: 'absolute',
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            borderRadius: '50%',
                            background: 'var(--red-primary)',
                            opacity: p.opacity * 0.5,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                            boxShadow: `0 0 ${p.size * 2}px var(--red-primary)`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScrollBackground;
