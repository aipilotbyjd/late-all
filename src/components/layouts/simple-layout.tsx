import { ReactNode } from "react";

interface SimpleLayoutProps {
    children: ReactNode;
    className?: string;
}

export const SimpleLayout = ({ children, className = "" }: SimpleLayoutProps) => {
    return (
        <div className={`min-h-dvh bg-primary ${className}`}>
            {children}
        </div>
    );
};