import { ReactFlow, Background, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode'; 

const baseNodes = [
  { id: 'laptop', position: { x: 0, y: 100 }, data: { label: 'Developer', icon: '💻' } },
  { id: 'github', position: { x: 200, y: 100 }, data: { label: 'GitHub', icon: '🐙' } },
  { id: 'repo-server', position: { x: 400, y: 0 }, data: { label: 'Repo Server', icon: '📦' } },
  { id: 'app-controller', position: { x: 400, y: 200 }, data: { label: 'App Controller', icon: '🧠' } },
  { id: 'k8s-api', position: { x: 600, y: 100 }, data: { label: 'K8s API', icon: '☸️' } },
  { id: 'worker', position: { x: 800, y: 100 }, data: { label: 'Worker Node', icon: '⚙️' } },
  { id: 'eso', position: { x: 800, y: 0 }, data: { label: 'ESO', icon: '🔐' } },
  { id: 'vault', position: { x: 1000, y: 0 }, data: { label: 'Vault', icon: '🏦' } },
  { id: 'pod', position: { x: 1000, y: 200 }, data: { label: 'Pod', icon: '📦' } },
];

const baseEdges = [
  { id: 'laptop-github', source: 'laptop', target: 'github', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'github-repo', source: 'github', target: 'repo-server', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'repo-controller', source: 'repo-server', target: 'app-controller', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'controller-k8s', source: 'app-controller', target: 'k8s-api', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'k8s-worker', source: 'k8s-api', target: 'worker', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'k8s-eso', source: 'k8s-api', target: 'eso', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'eso-vault', source: 'eso', target: 'vault', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'eso-pod', source: 'eso', target: 'pod', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
];

// Register the custom node type
const nodeTypes = { custom: CustomNode };

export default function TopologyMap({ step, visibleNodes }) {
  const nodesToShow = visibleNodes 
    ? baseNodes.filter(n => visibleNodes.includes(n.id)) 
    : baseNodes;

  // Add styling and 'isActive' status to the data
  const styledNodes = nodesToShow.map(n => ({
    ...n,
    type: 'custom', // Tell React Flow to use our CustomNode
    data: { 
      ...n.data, 
      isActive: step?.activeNodes?.includes(n.id) 
    }
  }));

  const styledEdges = baseEdges.map(e => ({
    ...e,
    animated: e.id === step?.activeEdge,
    style: { 
      stroke: e.id === step?.activeEdge ? '#10b981' : '#4b5563', 
      strokeWidth: 2 
    }
  }));

  return (
    <ReactFlow 
      nodes={styledNodes} 
      edges={styledEdges} 
      nodeTypes={nodeTypes} 
      fitView 
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#1f2937" gap={20} />
    </ReactFlow>
  );
}