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
    CheckCircle,
    XCircle,
    AlertCircle,
    SearchLg,
    FilterLines,
    Calendar,
    Clock,
    Zap,
    Users01,
    Eye
} from "@untitledui/icons";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageHeader } from "@/components/layouts/page-header";
import { StatsGrid, StatCard } from "@/components/layouts/stats-grid";
import { Table, TableCard } from "@/components/application/table/table";
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
        category: "Marketing",
        owner: "John Doe",
        tags: ["email", "marketing", "automation"]
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
        category: "Communication",
        owner: "Jane Smith",
        tags: ["slack", "notifications", "issues"]
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
        category: "Customer Success",
        owner: "Mike Johnson",
        tags: ["onboarding", "customers", "welcome"]
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
        category: "Operations",
        owner: "Sarah Wilson",
        tags: ["backup", "data", "schedule"]
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
        category: "Marketing",
        owner: "Tom Brown",
        tags: ["social", "monitoring", "automation"]
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

export const WorkflowsPageWorking = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredWorkflows = workflows.filter(workflow => {
        const matchesSearch = !searchTerm ||
            workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === "all" || workflow.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || workflow.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

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
                        <div className="flex items-center gap-3">
                            <Button
                                size="md"
                                color="secondary"
                                iconLeading={FilterLines}
                            >
                                Filter
                            </Button>
                            <Button
                                size="md"
                                color="primary"
                                iconLeading={Plus}
                                href="/workflows/new"
                            >
                                New Workflow
                            </Button>
                        </div>
                    }
                >
                    {/* Enhanced Search and Filters */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 max-w-md">
                            <Input
                                icon={SearchLg}
                                placeholder="Search workflows, tags, or descriptions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e?.target?.value || '')}
                                className="flex-1"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                className="rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-secondary focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 min-w-32"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="error">Error</option>
                            </select>

                            <select
                                className="rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-secondary focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 min-w-40"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Communication">Communication</option>
                                <option value="Customer Success">Customer Success</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>
                    </div>
                </PageHeader>

                {/* Enhanced Stats Cards */}
                <StatsGrid columns={4}>
                    <StatCard
                        title="Total Workflows"
                        value={workflows.length}
                        icon={<GitBranch01 className="size-8 text-brand-500" />}
                        subtitle={`${filteredWorkflows.length} visible`}
                    />

                    <StatCard
                        title="Active"
                        value={workflows.filter(w => w.status === 'active').length}
                        icon={<CheckCircle className="size-8 text-success-500" />}
                        trend={{
                            value: `${Math.round((workflows.filter(w => w.status === 'active').length / workflows.length) * 100)}%`,
                            isPositive: true
                        }}
                        subtitle="of total"
                    />

                    <StatCard
                        title="Total Executions"
                        value={workflows.reduce((sum, w) => sum + w.executions, 0).toLocaleString()}
                        icon={<Play className="size-8 text-brand-500" />}
                        subtitle="this month"
                    />

                    <StatCard
                        title="Avg Success Rate"
                        value={`${Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%`}
                        icon={<Zap className="size-8 text-success-500" />}
                        trend={{ value: "+2.3%", isPositive: true }}
                        subtitle="from last month"
                    />
                </StatsGrid>

                {/* Enhanced Table using proper Table component */}
                <TableCard.Root>
                    <TableCard.Header
                        title="Workflows"
                        badge={filteredWorkflows.length}
                        description={`Showing ${filteredWorkflows.length} of ${workflows.length} workflows`}
                        contentTrailing={
                            <div className="flex items-center gap-2">
                                <Button size="sm" color="tertiary" iconLeading={Calendar}>
                                    Export
                                </Button>
                            </div>
                        }
                    />

                    <Table aria-label="Workflows table" selectionMode="multiple">
                        <Table.Header>
                            <Table.Head label="Workflow" isRowHeader>
                                Workflow
                            </Table.Head>
                            <Table.Head label="Status">
                                Status
                            </Table.Head>
                            <Table.Head label="Category">
                                Category
                            </Table.Head>
                            <Table.Head label="Owner">
                                Owner
                            </Table.Head>
                            <Table.Head label="Performance">
                                Performance
                            </Table.Head>
                            <Table.Head label="Last Run">
                                Last Run
                            </Table.Head>
                            <Table.Head label="Actions">
                                Actions
                            </Table.Head>
                        </Table.Header>

                        <Table.Body>
                            {filteredWorkflows.map((workflow) => (
                                <Table.Row key={workflow.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(workflow.status)}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-primary truncate">
                                                        {workflow.name}
                                                    </p>
                                                    <div className="flex gap-1">
                                                        {workflow.tags.slice(0, 2).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {workflow.tags.length > 2 && (
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                                +{workflow.tags.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-tertiary truncate">
                                                    {workflow.description}
                                                </p>
                                                <div className="flex items-center gap-4 mt-1 text-xs text-quaternary">
                                                    <span>{workflow.nodes} nodes</span>
                                                    <span>Created {workflow.created}</span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-brand-50 text-brand-700">
                                                            {workflow.trigger}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {getStatusBadge(workflow.status)}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {workflow.category}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-brand-100 flex items-center justify-center">
                                                <Users01 className="size-3 text-brand-600" />
                                            </div>
                                            <span className="text-sm text-secondary">{workflow.owner}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-secondary">{workflow.executions} runs</span>
                                                <span className="text-secondary">{workflow.successRate}%</span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-1.5">
                                                <div
                                                    className="bg-success-500 h-1.5 rounded-full"
                                                    style={{ width: `${workflow.successRate}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-1 text-sm text-secondary">
                                            <Clock className="size-3 text-tertiary" />
                                            {workflow.lastRun}
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-1">
                                            <ButtonUtility
                                                size="sm"
                                                color="tertiary"
                                                icon={Edit01}
                                                tooltip="Edit workflow"
                                            />
                                            <ButtonUtility
                                                size="sm"
                                                color="tertiary"
                                                icon={Play}
                                                tooltip="Execute now"
                                            />
                                            <ButtonUtility
                                                size="sm"
                                                color="tertiary"
                                                icon={Eye}
                                                tooltip="View details"
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    {/* Enhanced Empty State */}
                    {filteredWorkflows.length === 0 && (
                        <div className="text-center py-16">
                            <div className="mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <GitBranch01 className="size-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-secondary mb-2">No workflows found</h3>
                            <p className="text-tertiary mb-6 max-w-sm mx-auto">
                                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                                    ? "Try adjusting your search terms or filters to find what you're looking for."
                                    : "Get started by creating your first automation workflow to streamline your processes."
                                }
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
                                    <Button
                                        size="md"
                                        color="secondary"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("all");
                                            setCategoryFilter("all");
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                )}
                                <Button
                                    size="md"
                                    color="primary"
                                    iconLeading={Plus}
                                    href="/workflows/new"
                                >
                                    Create Workflow
                                </Button>
                            </div>
                        </div>
                    )}
                </TableCard.Root>
            </div>
        </AppLayout>
    );
};