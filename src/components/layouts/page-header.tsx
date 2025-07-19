import { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
}

export const PageHeader = ({ title, description, actions, children }: PageHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-semibold text-primary">{title}</h1>
                    {description && (
                        <p className="mt-2 text-lg text-tertiary">{description}</p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};