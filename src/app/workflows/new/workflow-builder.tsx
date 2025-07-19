"use client";

import {
    Home01,
    GitBranch01,
    Play,
    Plus,
    Save01,
    ArrowLeft,
    Zap,
    Database01,
    Mail01,
    MessageSquare01,
    Calendar,
    Code01
} from "@untitledui/icons";
import { AppLayout } from "@/components/layouts/app-layout";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Textarea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";

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

const nodeTypes = [
    {
        id: 'trigger',
        name: 'Trigger',
        description: 'Start your workflow',
        icon: <Zap className="size-6 text-brand-600" />,
        color: 'bg-brand-50 border-brand-200'
    },
    {
        id: 'webhook',
        name: 'Webhook',
        description: 'Receive HTTP requests',
        icon: <Code01 className="size-6 text-purple-600" />,
        color: 'bg-purple-50 border-purple-200'
    },
    {
        id: 'email',
        name: 'Email',
        description: 'Send emails',
        icon: <Mail01 className="size-6 text-blue-600" />,
        color: 'bg-blue-50 border-blue-200'
    },
    {
        id: 'slack',
        name: 'Slack',
        description: 'Send Slack messages',
        icon: <MessageSquare01 className="size-6 text-green-600" />,
        color: 'bg-green-50 border-green-200'
    },
    {
        id: 'database',
        name: 'Database',
        description: 'Query or update data',
        icon: <Database01 className="size-6 text-orange-600" />,
        color: 'bg-orange-50 border-orange-200'
    },
    {
        id: 'schedule',
        name: 'Schedule',
        description: 'Run on a schedule',
        icon: <Calendar className="size-6 text-indigo-600" />,
        color: 'bg-indigo-50 border-indigo-200'
    }
];

export const WorkflowBuilder = () => {
    return (
        <AppLayout 
            activeUrl="/workflows" 
            headerNavItems={headerNavItems}
            searchPlaceholder="Search nodes and templates..."
        >
            <div className="flex h-full">
                {/* Left Sidebar - Node Palette */}
                <div className="w-80 border-r border-secondary bg-primary p-6">
                    <div className="mb-6">
                        <Button
                            size="sm"
                            color="tertiary"
                            iconLeading={ArrowLeft}
                            href="/workflows"
                            className="mb-4"
                        >
                            Back to Workflows
                        </Button>
                        <h2 className="text-lg font-semibold text-primary">Add Nodes</h2>
                        <p className="text-sm text-tertiary mt-1">Drag and drop to build your workflow</p>
                    </div>

                    <div className="space-y-3">
                        {nodeTypes.map((node) => (
                            <div
                                key={node.id}
                                className={`p-4 rounded-lg border-2 border-dashed cursor-pointer hover:shadow-md transition-all ${node.color}`}
                                draggable
                            >
                                <div className="flex items-center gap-3">
                                    {node.icon}
                                    <div>
                                        <h3 className="font-medium text-secondary">{node.name}</h3>
                                        <p className="text-xs text-tertiary">{node.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-secondary mb-3">Quick Templates</h3>
                        <div className="space-y-2">
                            <button className="w-full text-left p-3 rounded-lg border border-secondary hover:bg-secondary/50 transition-colors">
                                <div className="text-sm font-medium text-secondary">Email Newsletter</div>
                                <div className="text-xs text-tertiary">Schedule + Email + Database</div>
                            </button>
                            <button className="w-full text-left p-3 rounded-lg border border-secondary hover:bg-secondary/50 transition-colors">
                                <div className="text-sm font-medium text-secondary">Slack Alerts</div>
                                <div className="text-xs text-tertiary">Webhook + Slack</div>
                            </button>
                            <button className="w-full text-left p-3 rounded-lg border border-secondary hover:bg-secondary/50 transition-colors">
                                <div className="text-sm font-medium text-secondary">Data Sync</div>
                                <div className="text-xs text-tertiary">Schedule + Database + API</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Canvas Area */}
                <div className="flex-1 flex flex-col">
                    {/* Top Toolbar */}
                    <div className="border-b border-secondary bg-primary p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Input
                                    placeholder="Workflow name"
                                    defaultValue="Untitled Workflow"
                                    className="w-64"
                                />
                                <Select defaultValue="draft">
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                </Select>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button size="sm" color="tertiary">
                                    Test Workflow
                                </Button>
                                <Button size="sm" color="primary" iconLeading={Save01}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 bg-gray-50 relative overflow-hidden">
                        {/* Grid Background */}
                        <div 
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle, #94a3b8 1px, transparent 1px)
                                `,
                                backgroundSize: '20px 20px'
                            }}
                        />

                        {/* Canvas Content */}
                        <div className="relative h-full p-8">
                            {/* Start Node */}
                            <div className="absolute top-20 left-20">
                                <div className="bg-white rounded-lg border-2 border-brand-200 p-4 shadow-sm min-w-48">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-brand-50 rounded-lg">
                                            <Zap className="size-5 text-brand-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-secondary">Trigger</h3>
                                            <p className="text-xs text-tertiary">Workflow starts here</p>
                                        </div>
                                    </div>
                                    <Select defaultValue="webhook">
                                        <option value="webhook">Webhook</option>
                                        <option value="schedule">Schedule</option>
                                        <option value="manual">Manual</option>
                                    </Select>
                                </div>
                            </div>

                            {/* Connection Line */}
                            <svg className="absolute top-32 left-72 w-16 h-8">
                                <path
                                    d="M 0 16 L 64 16"
                                    stroke="#94a3b8"
                                    strokeWidth="2"
                                    fill="none"
                                    markerEnd="url(#arrowhead)"
                                />
                                <defs>
                                    <marker
                                        id="arrowhead"
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="9"
                                        refY="3.5"
                                        orient="auto"
                                    >
                                        <polygon
                                            points="0 0, 10 3.5, 0 7"
                                            fill="#94a3b8"
                                        />
                                    </marker>
                                </defs>
                            </svg>

                            {/* Drop Zone */}
                            <div className="absolute top-16 left-80">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white/50 min-w-48 text-center">
                                    <Plus className="size-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Drop a node here</p>
                                </div>
                            </div>

                            {/* Empty State Message */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center max-w-md">
                                    <GitBranch01 className="size-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">Build Your Workflow</h3>
                                    <p className="text-gray-500">
                                        Drag nodes from the left panel to create your automation workflow. 
                                        Connect them together to define the flow of your automation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Properties */}
                <div className="w-80 border-l border-secondary bg-primary p-6">
                    <h2 className="text-lg font-semibold text-primary mb-4">Properties</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Workflow Name
                            </label>
                            <Input defaultValue="Untitled Workflow" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Description
                            </label>
                            <Textarea 
                                placeholder="Describe what this workflow does..."
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Category
                            </label>
                            <Select defaultValue="">
                                <option value="">Select category</option>
                                <option value="marketing">Marketing</option>
                                <option value="communication">Communication</option>
                                <option value="operations">Operations</option>
                                <option value="customer-success">Customer Success</option>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Tags
                            </label>
                            <Input placeholder="Add tags separated by commas" />
                        </div>

                        <div className="pt-4 border-t border-secondary">
                            <h3 className="text-sm font-semibold text-secondary mb-3">Execution Settings</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Timeout (seconds)
                                    </label>
                                    <Input type="number" defaultValue="300" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Retry on Failure
                                    </label>
                                    <Select defaultValue="3">
                                        <option value="0">No retries</option>
                                        <option value="1">1 retry</option>
                                        <option value="3">3 retries</option>
                                        <option value="5">5 retries</option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};