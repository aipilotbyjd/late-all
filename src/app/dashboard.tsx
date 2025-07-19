"use client";

import {
    Home01,
    GitBranch01,
    Play,
    Clock,
    Users01,
    Zap,
    ArrowRight,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus
} from "@untitledui/icons";
import { AppLayout } from "@/components/layouts/app-layout";
import { PageHeader } from "@/components/layouts/page-header";
import { StatsGrid, StatCard } from "@/components/layouts/stats-grid";
import { Button } from "@/components/base/buttons/button";

const headerNavItems = [
    {
        label: "Dashboard",
        href: "/",
        current: true,
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
        current: false,
        icon: Play
    }
];

export const Dashboard = () => {
    return (
        <AppLayout 
            activeUrl="/" 
            headerNavItems={headerNavItems}
            searchPlaceholder="Search workflows, executions..."
        >
            <div className="p-8">
                <PageHeader
                    title="Dashboard"
                    description="Monitor your automation workflows and executions"
                    actions={
                        <Button 
                            size="lg" 
                            color="primary" 
                            iconLeading={Plus}
                            href="/workflows/new"
                        >
                            Create Workflow
                        </Button>
                    }
                />
                
                {/* Stats Overview */}
                <StatsGrid columns={4}>
                    <StatCard
                        title="Total Workflows"
                        value="24"
                        icon={<GitBranch01 className="size-6 text-brand-600" />}
                        subtitle="8 active, 16 inactive"
                    />
                    
                    <StatCard
                        title="Executions Today"
                        value="1,247"
                        icon={<Play className="size-6 text-success-600" />}
                        trend={{ value: "+12%", isPositive: true }}
                        subtitle="from yesterday"
                    />
                    
                    <StatCard
                        title="Failed Executions"
                        value="49"
                        icon={<XCircle className="size-6 text-error-600" />}
                        subtitle="3.9% failure rate"
                    />

                    <StatCard
                        title="Avg. Execution Time"
                        value="2.4s"
                        icon={<Clock className="size-6 text-warning-600" />}
                        trend={{ value: "-0.3s", isPositive: true }}
                        subtitle="from yesterday"
                    />
                </StatsGrid>
                
                {/* Recent Activity and Quick Actions */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Executions */}
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-primary">Recent Executions</h2>
                            <Button 
                                size="sm" 
                                color="tertiary" 
                                iconTrailing={ArrowRight}
                                href="/executions"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <CheckCircle className="size-5 text-success-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Email Newsletter Automation</p>
                                    <p className="text-xs text-tertiary">Completed in 1.2s</p>
                                </div>
                                <span className="text-xs text-tertiary">2 min ago</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <CheckCircle className="size-5 text-success-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Slack Notification Bot</p>
                                    <p className="text-xs text-tertiary">Completed in 0.8s</p>
                                </div>
                                <span className="text-xs text-tertiary">5 min ago</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <XCircle className="size-5 text-error-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Data Sync Workflow</p>
                                    <p className="text-xs text-tertiary">Failed: API timeout</p>
                                </div>
                                <span className="text-xs text-tertiary">8 min ago</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <AlertCircle className="size-5 text-warning-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Customer Onboarding</p>
                                    <p className="text-xs text-tertiary">Waiting for webhook</p>
                                </div>
                                <span className="text-xs text-tertiary">12 min ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Workflows */}
                    <div className="rounded-xl border border-secondary bg-primary p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-primary">Active Workflows</h2>
                            <Button 
                                size="sm" 
                                color="tertiary" 
                                iconTrailing={ArrowRight}
                                href="/workflows"
                            >
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <div className="size-2 rounded-full bg-success-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Email Newsletter Automation</p>
                                    <p className="text-xs text-tertiary">Triggered 247 times today</p>
                                </div>
                                <Zap className="size-4 text-brand-500" />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <div className="size-2 rounded-full bg-success-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Slack Notification Bot</p>
                                    <p className="text-xs text-tertiary">Triggered 89 times today</p>
                                </div>
                                <Zap className="size-4 text-brand-500" />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <div className="size-2 rounded-full bg-success-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Customer Onboarding</p>
                                    <p className="text-xs text-tertiary">Triggered 34 times today</p>
                                </div>
                                <Zap className="size-4 text-brand-500" />
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-secondary p-3">
                                <div className="size-2 rounded-full bg-success-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-secondary">Data Backup Scheduler</p>
                                    <p className="text-xs text-tertiary">Triggered 12 times today</p>
                                </div>
                                <Zap className="size-4 text-brand-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};