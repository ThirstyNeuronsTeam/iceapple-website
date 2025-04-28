import React from 'react';

interface HighlightProps {
    className?: string;
    children?: React.ReactNode;
}

const Highlight: React.FC<HighlightProps> = ({ className = '', children }) => {
    return <div className={`text-highlightcolor ${className}`}>{children}</div>;
};

export default Highlight;