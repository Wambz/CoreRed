import React, { useEffect, useState } from 'react';

const InteractionManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // 1. SCROLL TRACKING
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);

            // Section revelation system
            const animateOnScroll = () => {
                const sections = document.querySelectorAll('section, article');
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight * 0.8;
                    if (isVisible) {
                        section.classList.add('in-view');
                    }
                });
            };
            animateOnScroll();
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        // 2. EASTER EGGS
        let keys: string[] = [];
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        const dedsec = ['d', 'e', 'd', 's', 'e', 'c'];

        const handleKeydown = (e: KeyboardEvent) => {
            keys.push(e.key);
            keys = keys.slice(-10);

            // DedSec Check
            if (keys.slice(-6).join('').toLowerCase() === 'dedsec') {
                activateDedSec();
            }

            // Konami Check
            if (keys.join('') === konami.join('')) {
                activateKonami();
            }
        };

        const activateDedSec = () => {
            const flash = document.createElement('div');
            flash.className = 'fixed inset-0 bg-red-primary z-[99999] opacity-0 pointer-events-none animate-pulse';
            flash.style.opacity = '0.5';
            document.body.appendChild(flash);

            const audio = new Audio('https://www.soundjay.com/buttons/button-10.mp3');
            audio.play().catch(() => { });

            setTimeout(() => flash.remove(), 1000);
            alert('[ DEDSEC RECOGNIZED ] - PROTOCOL INITIATED');
        };

        const activateKonami = () => {
            document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <>
            <div
                className="progress-bar-global fixed top-0 left-0 h-1 bg-red-primary z-[99999] shadow-glow-red transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />
            {children}
        </>
    );
};

export default InteractionManager;
