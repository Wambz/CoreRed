import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add to trail
            if (Math.random() > 0.7) {
                setTrail(prev => [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev].slice(0, 10));
            }

            // Check for interactive elements
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea');
            setIsHovering(!!isInteractive);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    // Cleanup trail items
    useEffect(() => {
        if (trail.length === 0) return;
        const interval = setInterval(() => {
            setTrail(prev => prev.slice(0, -1));
        }, 100);
        return () => clearInterval(interval);
    }, [trail]);

    return (
        <>
            <div
                className={`custom-cursor fixed pointer-events-none z-[99999] transition-transform duration-100 ${isClicking ? 'scale-75' : 'scale-100'}`}
                style={{ left: position.x, top: position.y }}
            >
                <span className="cursor-dot absolute w-1 h-1 bg-red-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-glow-red"></span>
                <span className={`cursor-ring absolute w-5 h-5 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'w-10 h-10 border-cyan-primary shadow-glow-cyan' : 'border-red-primary shadow-glow-red'}`}></span>
            </div>

            {trail.map(point => (
                <div
                    key={point.id}
                    className="cursor-trail fixed w-1.5 h-1.5 bg-red-primary rounded-full pointer-events-none z-[99998] shadow-glow-red opacity-60"
                    style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
                ></div>
            ))}
        </>
    );
};

export default CustomCursor;
