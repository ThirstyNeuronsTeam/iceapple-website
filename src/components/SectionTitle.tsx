import React from 'react';

// SectionTitle.tsx

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string; // Optional className prop
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
    return (
        <span className={`text-highlight font-bold ${className || ''}`}>
            {children}
        </span>
    );
};

export default SectionTitle;