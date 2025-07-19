import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    subtitle?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export const StatCard = ({ title, value, icon, subtitle, trend }: StatCardProps) => {
    return (
        <div className="rounded-xl border border-secondary bg-primary p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-tertiary">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-primary">{value}</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                    {icon}
                </div>
            </div>
            {(subtitle || trend) && (
                <div className="mt-4 flex items-center">
                    {trend && (
                        <>
                            <span className={`text-sm font-medium ${trend.isPositive ? 'text-success-600' : 'text-error-600'}`}>
                                {trend.value}
                            </span>
                            {subtitle && <span className="ml-2 text-sm text-tertiary">{subtitle}</span>}
                        </>
                    )}
                    {!trend && subtitle && (
                        <span className="text-sm text-tertiary">{subtitle}</span>
                    )}
                </div>
            )}
        </div>
    );
};

interface StatsGridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4;
}

export const StatsGrid = ({ children, columns = 4 }: StatsGridProps) => {
    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3", 
        4: "md:grid-cols-2 lg:grid-cols-4"
    };

    return (
        <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]} mb-8`}>
            {children}
        </div>
    );
};