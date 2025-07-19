import { ReactNode } from "react";

interface Column {
    key: string;
    header: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    title?: string;
    emptyState?: {
        icon: ReactNode;
        title: string;
        description: string;
        action?: ReactNode;
    };
    onRowClick?: (row: any) => void;
}

export const DataTable = ({ 
    columns, 
    data, 
    title, 
    emptyState, 
    onRowClick 
}: DataTableProps) => {
    if (data.length === 0 && emptyState) {
        return (
            <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
                {title && (
                    <div className="px-6 py-4 border-b border-secondary">
                        <h2 className="text-lg font-semibold text-primary">{title}</h2>
                    </div>
                )}
                <div className="text-center py-12">
                    {emptyState.icon}
                    <h3 className="text-lg font-medium text-secondary mb-2">{emptyState.title}</h3>
                    <p className="text-tertiary mb-6">{emptyState.description}</p>
                    {emptyState.action}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            {title && (
                <div className="px-6 py-4 border-b border-secondary">
                    <h2 className="text-lg font-semibold text-primary">{title}</h2>
                </div>
            )}
            
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-secondary">
                        <tr>
                            {columns.map((column) => (
                                <th 
                                    key={column.key}
                                    className={`px-6 py-3 text-xs font-medium text-tertiary uppercase tracking-wider ${
                                        column.align === 'right' ? 'text-right' :
                                        column.align === 'center' ? 'text-center' :
                                        'text-left'
                                    }`}
                                    style={{ width: column.width }}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary">
                        {data.map((row, index) => (
                            <tr 
                                key={index} 
                                className={`hover:bg-secondary/50 ${onRowClick ? 'cursor-pointer' : ''}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td 
                                        key={column.key}
                                        className={`px-6 py-4 ${
                                            column.align === 'right' ? 'text-right' :
                                            column.align === 'center' ? 'text-center' :
                                            'text-left'
                                        }`}
                                    >
                                        {column.render 
                                            ? column.render(row[column.key], row)
                                            : row[column.key]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};