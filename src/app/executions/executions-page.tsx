"use client";

import { useState } from "react";
import {
    Home01,
    GitBranch01,
    Play,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Eye,
    RefreshCcw01,
    SearchLg,
    Calendar
} from "@untitledui/icons";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageHeader } from "@/components/layouts/page-header";
import { StatsGrid, StatCard } from "@/components/layouts/stats-grid";
import { AdvancedFilter } from "@/components/features/filters/advanced-filter";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";

const headerNavItems = [
    {
        label: "Dashboard",
        href: "/",
        current: false,
        icon: Home01
    },
    {
        label: "Workflows",
        href: "/workflows",
        current: false,
        icon: GitBranch01
    },
    {
        label: "Executions",
        href: "/executions",
        current: true,
        icon: Play
    }
];

const executions = [
    {
        id: "exec_001",
        workflowName: "Email Newsletter Automation",
        status: "success",
        startTime: "2024-01-20 14:30:25",
        endTime: "2024-01-20 14:30:27",
        duration: "1.2s",
        trigger: "Schedule",
        executedBy: "System",
        nodesExecuted: 5,
        totalNodes: 5
    },
    {
        id: "exec_002",
        workflowName: "Slack Notification Bot",
        status: "success",
        startTime: "2024-01-20 14:25:10",
        endTime: "2024-01-20 14:25:11",
        duration: "0.8s",
        trigger: "Webhook",
        executedBy: "API",
        nodesExecuted: 3,
        totalNodes: 3
    },
    {
        id: "exec_003",
        workflowName: "Data Sync Workflow",
        status: "failed",
        startTime: "2024-01-20 14:20:15",
        endTime: "2024-01-20 14:20:45",
        duration: "30.2s",
        trigger: "Manual",
        executedBy: "john@company.com",
        nodesExecuted: 2,
        totalNodes: 6,
        error: "API timeout - Connection refused"
    },
    {
        id: "exec_004",
        workflowName: "Customer Onboarding",
        status: "running",
        startTime: "2024-01-20 14:18:30",
        endTime: null,
        duration: "2m 15s",
        trigger: "Webhook",
        executedBy: "API",
        nodesExecuted: 4,
        totalNodes: 8
    },
    {
        id: "exec_005",
        workflowName: "Social Media Monitor",
        status: "cancelled",
        startTime: "2024-01-20 14:15:20",
        endTime: "2024-01-20 14:15:25",
        duration: "5.1s",
        trigger: "Schedule",
        executedBy: "System",
        nodesExecuted: 1,
        totalNodes: 6
    }
];

const filterOptions = [
    {
        id: 'status',
        label: 'Status',
        type: 'select' as const,
        options: [
            { value: 'success', label: 'Success' },
            { value: 'failed', label: 'Failed' },
            { value: 'running', label: 'Running' },
            { value: 'cancelled', label: 'Cancelled' }
        ]
    },
    {
        id: 'trigger',
        label: 'Trigger Type',
        type: 'select' as const,
        options: [
            { value: 'Schedule', label: 'Schedule' },
            { value: 'Webhook', label: 'Webhook' },
            { value: 'Manual', label: 'Manual' }
        ]
    },
    {
        id: 'workflow',
        label: 'Workflow',
        type: 'input' as const
    },
    {
        id: 'date',
        label: 'Date',
        type: 'date' as const
    }
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "success":
            return <CheckCircle className="size-4 text-success-500" />;
        case "failed":
            return <XCircle className="size-4 text-error-500" />;
        case "running":
            return <Play className="size-4 text-brand-500 animate-pulse" />;
        case "cancelled":
            return <AlertCircle className="size-4 text-warning-500" />;
        default:
            return <AlertCircle className="size-4 text-gray-500" />;
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case "success":
            return <BadgeWithDot color="success" size="sm">Success</BadgeWithDot>;
        case "failed":
            return <BadgeWithDot color="error" size="sm">Failed</BadgeWithDot>;
        case "running":
            return <BadgeWithDot color="brand" size="sm">Running</BadgeWithDot>;
        case "cancelled":
            return <BadgeWithDot color="warning" size="sm">Cancelled</BadgeWithDot>;
        default:
            return <BadgeWithDot color="gray" size="sm">Unknown</BadgeWithDot>;
    }
};

const formatDuration = (duration: string) => {
    if (duration.includes('m')) return duration;
    if (duration.includes('s')) return duration;
    return `${duration}ms`;
};

export const ExecutionsPage = () => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExecutions = executions.filter(execution => {
        const matchesStatus = !filters.status || execution.status === filters.status;
        const matchesTrigger = !filters.trigger || execution.trigger === filters.trigger;
        const matchesWorkflow = !filters.workflow ||
            execution.workflowName.toLowerCase().includes(filters.workflow.toLowerCase());
        const matchesSearch = !searchTerm ||
            execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            execution.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesTrigger && matchesWorkflow && matchesSearch;
    });

    const handleFiltersChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };

    const successCount = executions.filter(e => e.status === 'success').length;
    const failedCount = executions.filter(e => e.status === 'failed').length;
    const runningCount = executions.filter(e => e.status === 'running').length;
    const avgDuration = "1.8s"; // This would be calculated from actual data

    return (
        <AppLayout
            activeUrl="/executions"
            headerNavItems={headerNavItems}
            searchPlaceholder="Search executions..."
        >
            <div className="p-8">
                <PageHeader
                    title="Executions"
                    description="Monitor and manage workflow execution history"
                    actions={
                        <AdvancedFilter
                            filters={filterOptions}
                            onFiltersChange={handleFiltersChange}
                            activeFilters={filters}
                        />
                    }
                >
                    {/* Search Bar */}
                    <div className="max-w-md">
                        <Input
                            icon={SearchLg}
                            placeholder="Search executions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e?.target?.value || '')}
                        />
                    </div>
                </PageHeader>

                {/* Stats Cards */}
                <StatsGrid columns={4}>
                    <StatCard
                        title="Total Executions"
                        value={executions.length}
                        icon={<Play className="size-8 text-brand-500" />}
                        subtitle="Last 24 hours"
                    />

                    <StatCard
                        title="Successful"
                        value={successCount}
                        icon={<CheckCircle className="size-8 text-success-500" />}
                        trend={{
                            value: `${Math.round((successCount / executions.length) * 100)}%`,
                            isPositive: true
                        }}
                        subtitle="success rate"
                    />

                    <StatCard
                        title="Failed"
                        value={failedCount}
                        icon={<XCircle className="size-8 text-error-500" />}
                        trend={{
                            value: `${Math.round((failedCount / executions.length) * 100)}%`,
                            isPositive: false
                        }}
                        subtitle="failure rate"
                    />

                    <StatCard
                        title="Avg. Duration"
                        value={avgDuration}
                        icon={<Clock className="size-8 text-warning-500" />}
                        trend={{ value: "-0.3s", isPositive: true }}
                        subtitle="from yesterday"
                    />
                </StatsGrid>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-sm text-tertiary">
                        Showing {filteredExecutions.length} of {executions.length} executions
                    </p>
                </div>

                {/* Executions Table */}
                <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
                    <div className="px-6 py-4 border-b border-secondary">
                        <h2 className="text-lg font-semibold text-primary">Execution History</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-secondary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Execution
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Trigger
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Started
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary">
                                {filteredExecutions.map((execution) => (
                                    <tr key={execution.id} className="hover:bg-secondary/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(execution.status)}
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-primary">
                                                        {execution.workflowName}
                                                    </div>
                                                    <div className="text-sm text-tertiary">
                                                        ID: {execution.id}
                                                    </div>
                                                    {execution.error && (
                                                        <div className="text-xs text-error-600 mt-1">
                                                            {execution.error}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(execution.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary">
                                            {formatDuration(execution.duration)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="text-sm text-secondary">
                                                    {execution.nodesExecuted}/{execution.totalNodes}
                                                </div>
                                                <div className="ml-2 w-16 bg-secondary rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${execution.status === 'success' ? 'bg-success-500' :
                                                                execution.status === 'failed' ? 'bg-error-500' :
                                                                    execution.status === 'running' ? 'bg-brand-500' :
                                                                        'bg-warning-500'
                                                            }`}
                                                        style={{
                                                            width: `${(execution.nodesExecuted / execution.totalNodes) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {execution.trigger}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-secondary">
                                                {new Date(execution.startTime).toLocaleString()}
                                            </div>
                                            <div className="text-xs text-tertiary">
                                                by {execution.executedBy}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={Eye}
                                                    tooltip="View details"
                                                />
                                                {execution.status === 'failed' && (
                                                    <ButtonUtility
                                                        size="sm"
                                                        color="tertiary"
                                                        icon={RefreshCcw01}
                                                        tooltip="Retry execution"
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredExecutions.length === 0 && (
                        <div className="text-center py-12">
                            <Play className="mx-auto size-12 text-tertiary mb-4" />
                            <h3 className="text-lg font-medium text-secondary mb-2">No executions found</h3>
                            <p className="text-tertiary mb-6">
                                {searchTerm || Object.values(filters).some(f => f)
                                    ? "Try adjusting your search or filters"
                                    : "Executions will appear here when workflows run"
                                }
                            </p>
                            <Button
                                size="md"
                                color="primary"
                                href="/workflows"
                            >
                                View Workflows
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};