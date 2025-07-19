"use client";

import {
    Home01,
    Settings01,
    LifeBuoy01,
    SearchLg,
    Zap,
    Play,
    Clock,
    Database01,
    GitBranch01,
    Activity,
    Plus,
    ArrowRight,
    CheckCircle,
    XCircle,
    AlertCircle
} from "@untitledui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import type { NavItemType } from "@/components/application/app-navigation/config";

const navigationItems: NavItemType[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: Home01
    },
    {
        label: "Workflows",
        href: "/workflows",
        icon: GitBranch01,
        items: [
            { label: "All Workflows", href: "/workflows" },
            { label: "Active", href: "/workflows/active" },
            { label: "Templates", href: "/workflows/templates" }
        ]
    },
    {
        label: "Executions",
        href: "/executions",
        icon: Play,
        items: [
            { label: "All Executions", href: "/executions" },
            { label: "Running", href: "/executions/running" },
            { label: "Failed", href: "/executions/failed" }
        ]
    },
    {
        label: "Credentials",
        href: "/credentials",
        icon: Database01
    },
    {
        label: "Templates",
        href: "/templates",
        icon: Activity
    }
];

const footerItems: NavItemType[] = [
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01
    },
    {
        label: "Help",
        href: "/help",
        icon: LifeBuoy01
    }
];

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
        <div className="flex h-dvh flex-col">
            {/* Header Navigation */}
            <HeaderNavigationBase
                activeUrl="/"
                items={headerNavItems}
                trailingContent={
                    <Input
                        shortcut
                        aria-label="Search workflows, executions..."
                        placeholder="Search workflows, executions..."
                        icon={SearchLg}
                        size="sm"
                        className="max-w-xs"
                    />
                }
            />

            <div className="flex flex-1 min-h-0">
                <SidebarNavigationSlim
                    activeUrl="/"
                    items={navigationItems}
                    footerItems={footerItems}
                />

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-secondary">
                    <div className="p-8">
                        {/* Header with CTA */}
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-display-sm font-semibold text-primary">Dashboard</h1>
                                <p className="mt-2 text-lg text-tertiary">
                                    Monitor your automation workflows and executions
                                </p>
                            </div>
                            <Button
                                size="lg"
                                color="primary"
                                iconLeading={Plus}
                                href="/workflows/new"
                            >
                                Create Workflow
                            </Button>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-tertiary">Total Workflows</p>
                                        <p className="mt-2 text-3xl font-semibold text-primary">24</p>
                                    </div>
                                    <div className="rounded-lg bg-brand-50 p-3">
                                        <GitBranch01 className="size-6 text-brand-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <span className="text-sm text-tertiary">8 active, 16 inactive</span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-tertiary">Executions Today</p>
                                        <p className="mt-2 text-3xl font-semibold text-primary">1,247</p>
                                    </div>
                                    <div className="rounded-lg bg-success-50 p-3">
                                        <Play className="size-6 text-success-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <CheckCircle className="size-4 text-success-600" />
                                    <span className="ml-1 text-sm font-medium text-success-600">1,198 successful</span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-tertiary">Failed Executions</p>
                                        <p className="mt-2 text-3xl font-semibold text-primary">49</p>
                                    </div>
                                    <div className="rounded-lg bg-error-50 p-3">
                                        <XCircle className="size-6 text-error-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <span className="text-sm text-tertiary">3.9% failure rate</span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-tertiary">Avg. Execution Time</p>
                                        <p className="mt-2 text-3xl font-semibold text-primary">2.4s</p>
                                    </div>
                                    <div className="rounded-lg bg-warning-50 p-3">
                                        <Clock className="size-6 text-warning-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <span className="text-sm text-tertiary">-0.3s from yesterday</span>
                                </div>
                            </div>
                        </div>

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
                </main>
            </div>
        </div>
    );
};