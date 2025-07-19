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
    Calendar,
    Download01,
    Users01,
    Zap
} from "@untitledui/icons";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageHeader } from "@/components/layouts/page-header";
import { StatsGrid, StatCard } from "@/components/layouts/stats-grid";
import { Table, TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Dropdown } from "@/components/base/dropdown/dropdown";

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
        workflowId: "wf_001",
        status: "success",
        startTime: "2024-01-20 14:30:25",
        endTime: "2024-01-20 14:30:27",
        duration: 1200, // milliseconds
        trigger: "Schedule",
        executedBy: "System",
        nodesExecuted: 5,
        totalNodes: 5,
        dataProcessed: 247,
        cost: 0.05
    },
    {
        id: "exec_002",
        workflowName: "Slack Notification Bot",
        workflowId: "wf_002",
        status: "success",
        startTime: "2024-01-20 14:25:10",
        endTime: "2024-01-20 14:25:11",
        duration: 800,
        trigger: "Webhook",
        executedBy: "API",
        nodesExecuted: 3,
        totalNodes: 3,
        dataProcessed: 1,
        cost: 0.02
    },
    {
        id: "exec_003",
        workflowName: "Data Sync Workflow",
        workflowId: "wf_003",
        status: "failed",
        startTime: "2024-01-20 14:20:15",
        endTime: "2024-01-20 14:20:45",
        duration: 30200,
        trigger: "Manual",
        executedBy: "john@company.com",
        nodesExecuted: 2,
        totalNodes: 6,
        error: "API timeout - Connection refused",
        dataProcessed: 0,
        cost: 0.01
    },
    {
        id: "exec_004",
        workflowName: "Customer Onboarding",
        workflowId: "wf_004",
        status: "running",
        startTime: "2024-01-20 14:18:30",
        endTime: null,
        duration: 135000, // still running
        trigger: "Webhook",
        executedBy: "API",
        nodesExecuted: 4,
        totalNodes: 8,
        dataProcessed: 12,
        cost: 0.08
    },
    {
        id: "exec_005",
        workflowName: "Social Media Monitor",
        workflowId: "wf_005",
        status: "cancelled",
        startTime: "2024-01-20 14:15:20",
        endTime: "2024-01-20 14:15:25",
        duration: 5100,
        trigger: "Schedule",
        executedBy: "System",
        nodesExecuted: 1,
        totalNodes: 6,
        dataProcessed: 0,
        cost: 0.01
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

const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
};

const ExecutionActions = ({ execution }: { execution: any }) => (
    <Dropdown.Root>
        <Dropdown.DotsButton />
        <Dropdown.Popover className="w-48">
            <Dropdown.Menu>
                <Dropdown.Item icon={Eye}>
                    View details
                </Dropdown.Item>
                <Dropdown.Item icon={Download01}>
                    Download logs
                </Dropdown.Item>
                {execution.status === 'failed' && (
                    <Dropdown.Item icon={RefreshCcw01}>
                        Retry execution
                    </Dropdown.Item>
                )}
                {execution.status === 'running' && (
                    <Dropdown.Item icon={XCircle} className="text-error-600">
                        Cancel execution
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
);

export const ExecutionsPageEnhanced = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [triggerFilter, setTriggerFilter] = useState("all");

    const filteredExecutions = executions.filter(execution => {
        const matchesSearch = !searchTerm || 
            execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            execution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            execution.executedBy.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || execution.status === statusFilter;
        const matchesTrigger = triggerFilter === "all" || execution.trigger === triggerFilter;
        
        return matchesSearch && matchesStatus && matchesTrigger;
    });

    const successCount = executions.filter(e => e.status === 'success').length;
    const failedCount = executions.filter(e => e.status === 'failed').length;
    const runningCount = executions.filter(e => e.status === 'running').length;
    const avgDuration = Math.round(executions.reduce((sum, e) => sum + e.duration, 0) / executions.length);
    const totalCost = executions.reduce((sum, e) => sum + e.cost, 0);

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
                        <div className="flex items-center gap-3">
                            <Button 
                                size="md" 
                                color="secondary" 
                                iconLeading={Download01}
                            >
                                Export
                            </Button>
                            <Button 
                                size="md" 
                                color="primary" 
                                iconLeading={Play}
                                href="/workflows"
                            >
                                Run Workflow
                            </Button>
                        </div>
                    }
                >
                    {/* Enhanced Search and Filters */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 max-w-md">
                            <Input
                                icon={SearchLg}
                                placeholder="Search executions, workflows, or users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e?.target?.value || '')}
                                className="flex-1"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Dropdown.Root>
                                <Button 
                                    size="sm" 
                                    color="secondary"
                                    className="min-w-24"
                                >
                                    Status: {statusFilter === "all" ? "All" : statusFilter}
                                </Button>
                                <Dropdown.Popover>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onAction={() => setStatusFilter("all")}>
                                            All Statuses
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setStatusFilter("success")}>
                                            Success
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setStatusFilter("failed")}>
                                            Failed
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setStatusFilter("running")}>
                                            Running
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setStatusFilter("cancelled")}>
                                            Cancelled
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>

                            <Dropdown.Root>
                                <Button 
                                    size="sm" 
                                    color="secondary"
                                    className="min-w-28"
                                >
                                    Trigger: {triggerFilter === "all" ? "All" : triggerFilter}
                                </Button>
                                <Dropdown.Popover>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onAction={() => setTriggerFilter("all")}>
                                            All Triggers
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setTriggerFilter("Schedule")}>
                                            Schedule
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setTriggerFilter("Webhook")}>
                                            Webhook
                                        </Dropdown.Item>
                                        <Dropdown.Item onAction={() => setTriggerFilter("Manual")}>
                                            Manual
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>
                        </div>
                    </div>
                </PageHeader>

                {/* Enhanced Stats Cards */}
                <StatsGrid columns={4}>
                    <StatCard
                        title="Total Executions"
                        value={executions.length}
                        icon={<Play className="size-8 text-brand-500" />}
                        subtitle={`${filteredExecutions.length} visible`}
                    />
                    
                    <StatCard
                        title="Success Rate"
                        value={`${Math.round((successCount / executions.length) * 100)}%`}
                        icon={<CheckCircle className="size-8 text-success-500" />}
                        trend={{ 
                            value: `${successCount}/${executions.length}`, 
                            isPositive: true 
                        }}
                        subtitle="successful"
                    />
                    
                    <StatCard
                        title="Avg Duration"
                        value={formatDuration(avgDuration)}
                        icon={<Clock className="size-8 text-warning-500" />}
                        subtitle="per execution"
                    />
                    
                    <StatCard
                        title="Total Cost"
                        value={`$${totalCost.toFixed(2)}`}
                        icon={<Zap className="size-8 text-purple-500" />}
                        subtitle="this period"
                    />
                </StatsGrid>

                {/* Enhanced Table using proper Table component */}
                <TableCard.Root>
                    <TableCard.Header
                        title="Execution History"
                        badge={filteredExecutions.length}
                        description={`Showing ${filteredExecutions.length} of ${executions.length} executions`}
                        contentTrailing={
                            <div className="flex items-center gap-2">
                                <Button size="sm" color="tertiary" iconLeading={Calendar}>
                                    Last 24h
                                </Button>
                            </div>
                        }
                    />
                    
                    <Table aria-label="Executions table" selectionMode="multiple">
                        <Table.Header>
                            <Table.Head label="Execution" isRowHeader>
                                Execution
                            </Table.Head>
                            <Table.Head label="Status">
                                Status
                            </Table.Head>
                            <Table.Head label="Duration">
                                Duration
                            </Table.Head>
                            <Table.Head label="Progress">
                                Progress
                            </Table.Head>
                            <Table.Head label="Trigger">
                                Trigger
                            </Table.Head>
                            <Table.Head label="Data">
                                Data
                            </Table.Head>
                            <Table.Head label="Started">
                                Started
                            </Table.Head>
                            <Table.Head label="Actions">
                                Actions
                            </Table.Head>
                        </Table.Header>
                        
                        <Table.Body>
                            {filteredExecutions.map((execution) => (
                                <Table.Row key={execution.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(execution.status)}
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-primary truncate">
                                                    {execution.workflowName}
                                                </p>
                                                <p className="text-xs text-tertiary">
                                                    ID: {execution.id}
                                                </p>
                                                {execution.error && (
                                                    <p className="text-xs text-error-600 mt-1 truncate">
                                                        {execution.error}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        {getStatusBadge(execution.status)}
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <div className="flex items-center gap-1">
                                            <Clock className="size-3 text-tertiary" />
                                            <span className="text-sm text-secondary">
                                                {formatDuration(execution.duration)}
                                            </span>
                                        </div>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-secondary">
                                                    {execution.nodesExecuted}/{execution.totalNodes} nodes
                                                </span>
                                                <span className="text-secondary">
                                                    {Math.round((execution.nodesExecuted / execution.totalNodes) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-1.5">
                                                <div 
                                                    className={`h-1.5 rounded-full ${
                                                        execution.status === 'success' ? 'bg-success-500' :
                                                        execution.status === 'failed' ? 'bg-error-500' :
                                                        execution.status === 'running' ? 'bg-brand-500' :
                                                        'bg-warning-500'
                                                    }`}
                                                    style={{ 
                                                        width: `${(execution.nodesExecuted / execution.totalNodes) * 100}%` 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {execution.trigger}
                                        </span>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <div className="text-sm">
                                            <div className="text-secondary">{execution.dataProcessed} items</div>
                                            <div className="text-xs text-tertiary">${execution.cost.toFixed(3)} cost</div>
                                        </div>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <div className="space-y-1">
                                            <div className="text-sm text-secondary">
                                                {new Date(execution.startTime).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-tertiary">
                                                <Users01 className="size-3" />
                                                {execution.executedBy}
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                        <div className="flex items-center gap-1">
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
                                            <ExecutionActions execution={execution} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    {/* Enhanced Empty State */}
                    {filteredExecutions.length === 0 && (
                        <div className="text-center py-16">
                            <div className="mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Play className="size-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-secondary mb-2">No executions found</h3>
                            <p className="text-tertiary mb-6 max-w-sm mx-auto">
                                {searchTerm || statusFilter !== "all" || triggerFilter !== "all"
                                    ? "Try adjusting your search terms or filters to find what you're looking for."
                                    : "Executions will appear here when workflows run. Start by executing a workflow."
                                }
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                {(searchTerm || statusFilter !== "all" || triggerFilter !== "all") && (
                                    <Button 
                                        size="md" 
                                        color="secondary"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("all");
                                            setTriggerFilter("all");
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                )}
                                <Button 
                                    size="md" 
                                    color="primary" 
                                    iconLeading={Play}
                                    href="/workflows"
                                >
                                    View Workflows
                                </Button>
                            </div>
                        </div>
                    )}
                </TableCard.Root>
            </div>
        </AppLayout>
    );
};