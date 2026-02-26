import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        category: string;
        image: string;
        challenge: string;
        solution: string;
        results: string[];
        stack: string[];
        link: string;
        github?: string;
    };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <article
            className="project-card perspective-1000 cursor-pointer"
            style={{ height: '550px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className="transform-style-3d relative w-full h-full"
                style={{
                    transition: 'transform 0.7s ease',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* ====== FRONT SIDE ====== */}
                <div
                    className="backface-hidden absolute inset-0 flex flex-col rounded-lg overflow-hidden"
                    style={{
                        backgroundColor: 'var(--black-card)',
                        border: '2px solid var(--red-primary)',
                        boxShadow: '0 0 14px rgba(255,0,64,0.56), 0 0 28px rgba(255,0,64,0.35)',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--cyan-primary)';
                        e.currentTarget.style.boxShadow = '0 0 14px rgba(0,255,255,0.42), 0 0 28px rgba(0,255,255,0.21)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--red-primary)';
                        e.currentTarget.style.boxShadow = '0 0 14px rgba(255,0,64,0.56), 0 0 28px rgba(255,0,64,0.35)';
                    }}
                >
                    {/* Header */}
                    <div
                        className="p-4 flex justify-between items-center"
                        style={{
                            borderBottom: '1px solid var(--red-transparent-30)',
                            background: 'linear-gradient(to right, rgba(255,0,64,0.1), transparent)',
                        }}
                    >
                        <span className="font-code text-xs tracking-widest" style={{ color: 'var(--white-tertiary)' }}>
                            PROJECT#00{project.id}
                        </span>
                        <span
                            className="font-code text-xs px-3 py-1 rounded-sm uppercase"
                            style={{
                                color: 'var(--green-success)',
                                border: '1px solid var(--green-success)',
                                backgroundColor: 'rgba(57,255,20,0.1)',
                                textShadow: '0 0 10px rgba(57,255,20,0.6)',
                            }}
                        >
                            ✓ Complete
                        </span>
                    </div>

                    {/* Image */}
                    <div className="relative w-full" style={{ height: '180px', overflow: 'hidden' }}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            style={{ opacity: 0.6 }}
                        />
                        <div className="animate-scanlines absolute inset-0 pointer-events-none"></div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-5 flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-red-primary">
                        <h3
                            className="text-lg font-bold tracking-wide leading-tight"
                            style={{ color: 'var(--white-primary)', fontFamily: 'var(--font-secondary)', fontSize: '1.1rem' }}
                        >
                            {project.title}
                        </h3>

                        <div className="font-code flex flex-col gap-1" style={{ fontSize: '11px', color: 'var(--white-tertiary)' }}>
                            <div className="flex items-center gap-2">
                                <span style={{ color: 'var(--cyan-primary)' }}>▸</span>
                                {project.category}
                            </div>
                            <div className="flex items-center gap-2">
                                <span style={{ color: 'var(--cyan-primary)' }}>◇</span>
                                {project.stack.slice(0, 3).join(' | ')}
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed" style={{ color: 'var(--white-secondary)' }}>
                            {project.challenge.length > 120 ? project.challenge.substring(0, 120) + '...' : project.challenge}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.stack.map(tech => (
                                <span
                                    key={tech}
                                    className="font-code px-3 py-1 rounded-full transition-all duration-300"
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--white-tertiary)',
                                        border: '1px solid var(--red-transparent-30)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        className="p-4"
                        style={{
                            borderTop: '1px solid var(--red-transparent-30)',
                            background: 'linear-gradient(to right, transparent, rgba(255,0,64,0.1))',
                        }}
                    >
                        <div className="w-full h-1 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--black-secondary)' }}>
                            <div
                                className="h-full w-full animate-pulse"
                                style={{ background: 'linear-gradient(to right, var(--red-primary), var(--green-success))' }}
                            ></div>
                        </div>
                        <p className="font-code tracking-widest uppercase" style={{ fontSize: '10px', color: 'var(--green-success)' }}>
                            100% Complete
                        </p>
                    </div>
                </div>

                {/* ====== BACK SIDE ====== */}
                <div
                    className="backface-hidden absolute inset-0 flex flex-col rounded-lg p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-primary"
                    style={{
                        backgroundColor: 'var(--black-card)',
                        border: '2px solid var(--cyan-primary)',
                        boxShadow: '0 0 14px rgba(0,255,255,0.42), 0 0 28px rgba(0,255,255,0.21)',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="relative">
                        <button
                            title="Close details"
                            aria-label="Close project details"
                            className="absolute top-0 right-0 p-1 transition-colors"
                            style={{ color: 'var(--white-secondary)' }}
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red-primary)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white-secondary)')}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3
                            className="text-xl font-bold mb-6 tracking-wide"
                            style={{ color: 'var(--white-primary)', fontFamily: 'var(--font-secondary)' }}
                        >
                            {project.title}
                        </h3>

                        <div className="mb-5">
                            <h4
                                className="font-code text-xs uppercase tracking-widest mb-3 pb-2"
                                style={{ color: 'var(--cyan-primary)', borderBottom: '1px solid var(--cyan-transparent)' }}
                            >
                                Project Overview
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--white-secondary)' }}>
                                {project.solution}
                            </p>
                        </div>

                        <div className="mb-5">
                            <h4
                                className="font-code text-xs uppercase tracking-widest mb-3 pb-2"
                                style={{ color: 'var(--cyan-primary)', borderBottom: '1px solid var(--cyan-transparent)' }}
                            >
                                Key Results
                            </h4>
                            <ul className="space-y-2">
                                {project.results.map((result, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--white-secondary)' }}>
                                        <span className="mt-1 font-bold" style={{ color: 'var(--red-primary)' }}>▸</span>
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3 mt-auto pt-5" style={{ borderTop: '1px solid var(--cyan-transparent)' }}>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-code font-bold text-center rounded transition-all duration-300 px-4 py-3"
                                style={{
                                    color: 'var(--cyan-primary)',
                                    border: '1px solid var(--cyan-primary)',
                                }}
                                onClick={(e) => e.stopPropagation()}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0,255,255,0.1)';
                                    e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                → VIEW DEMO
                            </a>
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-code font-bold text-center rounded transition-all duration-300 px-4 py-3"
                                    style={{
                                        color: 'var(--white-tertiary)',
                                        border: '1px solid var(--white-tertiary)',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    → GITHUB
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
