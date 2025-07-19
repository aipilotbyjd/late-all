"use client";

import { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  ArrowLeft,
  Save01,
  Play,
  Settings01,
  Zap,
  Database01,
  Mail01,
  MessageSquare01,
  Calendar,
  Code01,
  Plus,
  X,
  Edit01
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";

// Custom Node Components
const TriggerNode = ({ data, selected }: { data: any; selected: boolean }) => {
  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-48 ${
      selected ? 'border-brand-500' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand-50 rounded-lg">
          <Zap className="size-5 text-brand-600" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{data.label}</div>
          <div className="text-sm text-gray-500">{data.type}</div>
        </div>
      </div>
      {data.config && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
          {data.config}
        </div>
      )}
    </div>
  );
};

const ActionNode = ({ data, selected }: { data: any; selected: boolean }) => {
  const getIcon = () => {
    switch (data.nodeType) {
      case 'email': return <Mail01 className="size-5 text-blue-600" />;
      case 'slack': return <MessageSquare01 className="size-5 text-green-600" />;
      case 'database': return <Database01 className="size-5 text-orange-600" />;
      case 'webhook': return <Code01 className="size-5 text-purple-600" />;
      default: return <Zap className="size-5 text-gray-600" />;
    }
  };

  const getBgColor = () => {
    switch (data.nodeType) {
      case 'email': return 'bg-blue-50 border-blue-200';
      case 'slack': return 'bg-green-50 border-green-200';
      case 'database': return 'bg-orange-50 border-orange-200';
      case 'webhook': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-48 ${
      selected ? 'border-brand-500' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getBgColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{data.label}</div>
          <div className="text-sm text-gray-500">{data.description}</div>
        </div>
      </div>
      {data.status && (
        <div className="mt-2 flex items-center gap-2">
          <div className={`size-2 rounded-full ${
            data.status === 'configured' ? 'bg-green-500' : 'bg-gray-300'
          }`} />
          <span className="text-xs text-gray-500">
            {data.status === 'configured' ? 'Configured' : 'Not configured'}
          </span>
        </div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Trigger', 
      type: 'When this happens...',
      config: 'Click to configure'
    },
  },
];

const initialEdges: Edge[] = [];

const nodeTemplates = [
  {
    id: 'trigger',
    name: 'Trigger',
    description: 'Start your workflow',
    icon: <Zap className="size-6 text-brand-600" />,
    color: 'bg-brand-50 border-brand-200',
    category: 'triggers'
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Receive HTTP requests',
    icon: <Code01 className="size-6 text-purple-600" />,
    color: 'bg-purple-50 border-purple-200',
    category: 'triggers'
  },
  {
    id: 'schedule',
    name: 'Schedule',
    description: 'Run on a schedule',
    icon: <Calendar className="size-6 text-indigo-600" />,
    color: 'bg-indigo-50 border-indigo-200',
    category: 'triggers'
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Send emails',
    icon: <Mail01 className="size-6 text-blue-600" />,
    color: 'bg-blue-50 border-blue-200',
    category: 'actions'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send Slack messages',
    icon: <MessageSquare01 className="size-6 text-green-600" />,
    color: 'bg-green-50 border-green-200',
    category: 'actions'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Query or update data',
    icon: <Database01 className="size-6 text-orange-600" />,
    color: 'bg-orange-50 border-orange-200',
    category: 'actions'
  },
];

export const WorkflowBuilderFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNode = useCallback((template: any) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: template.category === 'triggers' ? 'trigger' : 'action',
      position: { 
        x: Math.random() * 400 + 200, 
        y: Math.random() * 300 + 200 
      },
      data: { 
        label: template.name,
        description: template.description,
        nodeType: template.id,
        status: 'not_configured'
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes.length, setNodes]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, [setNodes]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              color="tertiary"
              iconLeading={ArrowLeft}
              href="/workflows"
            >
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e?.target?.value || '')}
                className="text-lg font-semibold border-none bg-transparent px-0 focus:ring-0"
              />
              <Button
                size="sm"
                color="tertiary"
                iconLeading={Edit01}
              >
                Rename
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" color="tertiary" iconLeading={Settings01}>
              Settings
            </Button>
            <Button size="sm" color="secondary" iconLeading={Play}>
              Test
            </Button>
            <Button size="sm" color="primary" iconLeading={Save01}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Node Palette */}
        {sidebarOpen && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Nodes</h2>
                <Button
                  size="sm"
                  color="tertiary"
                  iconLeading={X}
                  onClick={() => setSidebarOpen(false)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Drag and drop to add nodes</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Triggers</h3>
                  <div className="space-y-2">
                    {nodeTemplates.filter(t => t.category === 'triggers').map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border-2 border-dashed cursor-pointer hover:shadow-md transition-all ${template.color}`}
                        onClick={() => addNode(template)}
                      >
                        <div className="flex items-center gap-3">
                          {template.icon}
                          <div>
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Actions</h3>
                  <div className="space-y-2">
                    {nodeTemplates.filter(t => t.category === 'actions').map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border-2 border-dashed cursor-pointer hover:shadow-md transition-all ${template.color}`}
                        onClick={() => addNode(template)}
                      >
                        <div className="flex items-center gap-3">
                          {template.icon}
                          <div>
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 relative">
          {!sidebarOpen && (
            <Button
              size="sm"
              color="tertiary"
              iconLeading={Plus}
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-10"
            >
              Add Node
            </Button>
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Node Properties */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedNode.data.label}
                </h2>
                <Button
                  size="sm"
                  color="tertiary"
                  iconLeading={X}
                  onClick={() => deleteNode(selectedNode.id)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Configure this node</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Node Name
                  </label>
                  <Input
                    value={selectedNode.data.label}
                    onChange={(e) => updateNodeData(selectedNode.id, { label: e?.target?.value || '' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <TextArea
                    value={selectedNode.data.description || ''}
                    onChange={(e) => updateNodeData(selectedNode.id, { description: e?.target?.value || '' })}
                    rows={3}
                  />
                </div>

                {selectedNode.type === 'trigger' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger Type
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      value={selectedNode.data.nodeType || 'webhook'}
                      onChange={(e) => updateNodeData(selectedNode.id, { nodeType: e.target.value })}
                    >
                      <option value="webhook">Webhook</option>
                      <option value="schedule">Schedule</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                )}

                {selectedNode.type === 'action' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Action Type
                      </label>
                      <select
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        value={selectedNode.data.nodeType || 'email'}
                        onChange={(e) => updateNodeData(selectedNode.id, { nodeType: e.target.value })}
                      >
                        <option value="email">Email</option>
                        <option value="slack">Slack</option>
                        <option value="database">Database</option>
                        <option value="webhook">Webhook</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Configuration
                      </label>
                      <TextArea
                        placeholder="Enter configuration details..."
                        value={selectedNode.data.config || ''}
                        onChange={(e) => updateNodeData(selectedNode.id, { 
                          config: e?.target?.value || '',
                          status: e?.target?.value ? 'configured' : 'not_configured'
                        })}
                        rows={4}
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    size="sm"
                    color="error"
                    onClick={() => deleteNode(selectedNode.id)}
                    className="w-full"
                  >
                    Delete Node
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};