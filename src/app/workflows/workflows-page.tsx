"use client";

import { useState } from "react";
import {
    Home01,
    GitBranch01,
    Play,
    Plus,
    Edit01,
    Copy01,
    Power01,
    DotsHorizontal,
    CheckCircle,
    XCircle,
    AlertCircle,
    SearchLg
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
        current: true,
        icon: GitBranch01
    },
    {
        label: "Executions",
        href: "/executions",
        current: false,
        icon: Play
    }
];

const workflows = [
    {
        id: 1,
        name: "Email Newsletter Automation",
        description: "Automatically send weekly newsletters to subscribers",
        status: "active",
        lastRun: "2 minutes ago",
        executions: 247,
        successRate: 98.4,
        trigger: "Schedule",
        nodes: 5,
        created: "2024-01-15",
        category: "Marketing"
    },
    {
        id: 2,
        name: "Slack Notification Bot",
        description: "Send notifications to Slack when new issues are created",
        status: "active",
        lastRun: "5 minutes ago",
        executions: 89,
        successRate: 100,
        trigger: "Webhook",
        nodes: 3,
        created: "2024-01-12",
        category: "Communication"
    },
    {
        id: 3,
        name: "Customer Onboarding",
        description: "Automated welcome sequence for new customers",
        status: "paused",
        lastRun: "1 hour ago",
        executions: 34,
        successRate: 94.1,
        trigger: "Webhook",
        nodes: 8,
        created: "2024-01-10",
        category: "Customer Success"
    },
    {
        id: 4,
        name: "Data Backup Scheduler",
        description: "Daily backup of customer data to cloud storage",
        status: "active",
        lastRun: "12 hours ago",
        executions: 12,
        successRate: 100,
        trigger: "Schedule",
        nodes: 4,
        created: "2024-01-08",
        category: "Operations"
    },
    {
        id: 5,
        name: "Social Media Monitor",
        description: "Monitor mentions and respond automatically",
        status: "error",
        lastRun: "2 hours ago",
        executions: 156,
        successRate: 87.2,
        trigger: "Webhook",
        nodes: 6,
        created: "2024-01-05",
        category: "Marketing"
    }
];

const filterOptions = [
    {
        id: 'status',
        label: 'Status',
        type: 'select' as const,
        options: [
            { value: 'active', label: 'Active' },
            { value: 'paused', label: 'Paused' },
            { value: 'error', label: 'Error' }
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
        id: 'category',
        label: 'Category',
        type: 'select' as const,
        options: [
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Communication', label: 'Communication' },
            { value: 'Customer Success', label: 'Customer Success' },
            { value: 'Operations', label: 'Operations' }
        ]
    },
    {
        id: 'search',
        label: 'Search',
        type: 'input' as const
    }
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case "active":
            return <CheckCircle className="size-4 text-success-500" />;
        case "paused":
            return <AlertCircle className="size-4 text-warning-500" />;
        case "error":
            return <XCircle className="size-4 text-error-500" />;
        default:
            return <AlertCircle className="size-4 text-gray-500" />;
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case "active":
            return <BadgeWithDot color="success" size="sm">Active</BadgeWithDot>;
        case "paused":
            return <BadgeWithDot color="warning" size="sm">Paused</BadgeWithDot>;
        case "error":
            return <BadgeWithDot color="error" size="sm">Error</BadgeWithDot>;
        default:
            return <BadgeWithDot color="gray" size="sm">Unknown</BadgeWithDot>;
    }
};

export const WorkflowsPage = () => {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const filteredWorkflows = workflows.filter(workflow => {
        const matchesStatus = !filters.status || workflow.status === filters.status;
        const matchesTrigger = !filters.trigger || workflow.trigger === filters.trigger;
        const matchesCategory = !filters.category || workflow.category === filters.category;
        const matchesSearch = !searchTerm ||
            workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesTrigger && matchesCategory && matchesSearch;
    });

    const handleFiltersChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };

    return (
        <AppLayout
            activeUrl="/workflows"
            headerNavItems={headerNavItems}
            searchPlaceholder="Search workflows..."
        >
            <div className="p-8">
                <PageHeader
                    title="Workflows"
                    description="Create and manage your automation workflows"
                    actions={
                        <>
                            <AdvancedFilter
                                filters={filterOptions}
                                onFiltersChange={handleFiltersChange}
                                activeFilters={filters}
                            />
                            <Button
                                size="md"
                                color="primary"
                                iconLeading={Plus}
                                href="/workflows/new"
                            >
                                New Workflow
                            </Button>
                        </>
                    }
                >
                    {/* Search Bar */}
                    <div className="max-w-md">
                        <Input
                            icon={SearchLg}
                            placeholder="Search workflows..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e?.target?.value || '')}
                        />
                    </div>
                </PageHeader>

                {/* Stats Cards */}
                <StatsGrid columns={4}>
                    <StatCard
                        title="Total Workflows"
                        value={workflows.length}
                        icon={<GitBranch01 className="size-8 text-brand-500" />}
                    />

                    <StatCard
                        title="Active"
                        value={workflows.filter(w => w.status === 'active').length}
                        icon={<CheckCircle className="size-8 text-success-500" />}
                    />

                    <StatCard
                        title="Paused"
                        value={workflows.filter(w => w.status === 'paused').length}
                        icon={<AlertCircle className="size-8 text-warning-500" />}
                    />

                    <StatCard
                        title="Errors"
                        value={workflows.filter(w => w.status === 'error').length}
                        icon={<XCircle className="size-8 text-error-500" />}
                    />
                </StatsGrid>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-sm text-tertiary">
                        Showing {filteredWorkflows.length} of {workflows.length} workflows
                    </p>
                </div>

                {/* Workflows Table */}
                <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
                    <div className="px-6 py-4 border-b border-secondary">
                        <h2 className="text-lg font-semibold text-primary">All Workflows</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-secondary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Workflow
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Last Run
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Executions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Success Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Trigger
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-tertiary uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary">
                                {filteredWorkflows.map((workflow) => (
                                    <tr key={workflow.id} className="hover:bg-secondary/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(workflow.status)}
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-primary">
                                                        {workflow.name}
                                                    </div>
                                                    <div className="text-sm text-tertiary">
                                                        {workflow.description}
                                                    </div>
                                                    <div className="text-xs text-quaternary mt-1">
                                                        {workflow.nodes} nodes • Created {workflow.created}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(workflow.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {workflow.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary">
                                            {workflow.lastRun}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary">
                                            {workflow.executions.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="text-sm text-secondary">
                                                    {workflow.successRate}%
                                                </div>
                                                <div className="ml-2 w-16 bg-secondary rounded-full h-2">
                                                    <div
                                                        className="bg-success-500 h-2 rounded-full"
                                                        style={{ width: `${workflow.successRate}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
                                                {workflow.trigger}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={Edit01}
                                                    tooltip="Edit workflow"
                                                />
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={Copy01}
                                                    tooltip="Duplicate workflow"
                                                />
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={Power01}
                                                    tooltip={workflow.status === 'active' ? 'Pause workflow' : 'Activate workflow'}
                                                />
                                                <ButtonUtility
                                                    size="sm"
                                                    color="tertiary"
                                                    icon={DotsHorizontal}
                                                    tooltip="More options"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredWorkflows.length === 0 && (
                        <div className="text-center py-12">
                            <GitBranch01 className="mx-auto size-12 text-tertiary mb-4" />
                            <h3 className="text-lg font-medium text-secondary mb-2">No workflows found</h3>
                            <p className="text-tertiary mb-6">
                                {searchTerm || Object.values(filters).some(f => f)
                                    ? "Try adjusting your search or filters"
                                    : "Get started by creating your first workflow"
                                }
                            </p>
                            <Button
                                size="md"
                                color="primary"
                                iconLeading={Plus}
                                href="/workflows/new"
                            >
                                Create Workflow
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};