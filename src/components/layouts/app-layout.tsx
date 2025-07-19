"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
    Home01,
    Settings01,
    LifeBuoy01,
    SearchLg,
    GitBranch01,
    Play,
    Database01,
    Activity
} from "@untitledui/icons";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Input } from "@/components/base/input/input";
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

interface AppLayoutProps {
    children: ReactNode;
    activeUrl: string;
    headerNavItems: Array<{
        label: string;
        href: string;
        current: boolean;
        icon: any;
    }>;
    searchPlaceholder?: string;
}

export const AppLayout = ({ 
    children, 
    activeUrl, 
    headerNavItems, 
    searchPlaceholder = "Search..." 
}: AppLayoutProps) => {
    return (
        <div className="flex h-dvh flex-col">
            {/* Header Navigation */}
            <HeaderNavigationBase
                activeUrl={activeUrl}
                items={headerNavItems}
                trailingContent={
                    <Input 
                        shortcut 
                        aria-label={searchPlaceholder} 
                        placeholder={searchPlaceholder} 
                        icon={SearchLg} 
                        size="sm" 
                        className="max-w-xs"
                    />
                }
            />
            
            <div className="flex flex-1 min-h-0">
                <SidebarNavigationSlim
                    activeUrl={activeUrl}
                    items={navigationItems}
                    footerItems={footerItems}
                />

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-secondary">
                    {children}
                </main>
            </div>
        </div>
    );
};