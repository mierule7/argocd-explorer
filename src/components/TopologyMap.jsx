import { ReactFlow, Background, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
  { id: 'laptop', position: { x: 0, y: 100 }, data: { label: '💻 Developer' } },
  { id: 'github', position: { x: 200, y: 100 }, data: { label: '🐙 GitHub' } },
  { id: 'repo-server', position: { x: 400, y: 0 }, data: { label: '📦 Repo Server' } },
  { id: 'app-controller', position: { x: 400, y: 200 }, data: { label: '🧠 App Controller' } },
  { id: 'k8s-api', position: { x: 600, y: 100 }, data: { label: '☸️ K8s API' } },
  { id: 'worker', position: { x: 800, y: 100 }, data: { label: '⚙️ Worker Node' } },
  { id: 'eso', position: { x: 800, y: 0 }, data: { label: '🔐 ESO' } },
  { id: 'vault', position: { x: 1000, y: 0 }, data: { label: '🏦 Vault' } },
  { id: 'pod', position: { x: 1000, y: 200 }, data: { label: '📦 Pod' } },
];

const baseEdges = [
  { id: 'laptop-github', source: 'laptop', target: 'github', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'github-repo', source: 'github', target: 'repo-server', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'repo-controller', source: 'repo-server', target: 'app-controller', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'controller-k8s', source: 'app-controller', target: 'k8s-api', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'k8s-worker', source: 'k8s-api', target: 'worker', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'k8s-eso', source: 'k8s-api', target: 'eso', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'eso-vault', source: 'eso', target: 'vault', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'eso-pod', source: 'eso', target: 'pod', markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function TopologyMap({ step, visibleNodes }) {
  // If visibleNodes is provided, only show those nodes. Otherwise, show all.
  const nodesToShow = visibleNodes 
    ? nodes.filter(n => visibleNodes.includes(n.id)) 
    : nodes;

  const styledNodes = nodesToShow.map(n => ({
    ...n,
    style: {
      background: step?.activeNodes?.includes(n.id) ? '#3b82f6' : '#1f2937',
      border: '2px solid #4b5563',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      width: 140,
      textAlign: 'center'
    }
  }));

  const styledEdges = baseEdges.map(e => ({
    ...e,
    animated: e.id === step?.activeEdge,
    style: { stroke: e.id === step?.activeEdge ? '#10b981' : '#4b5563', strokeWidth: 2 }
  }));

  return (
    <ReactFlow nodes={styledNodes} edges={styledEdges} fitView proOptions={{ hideAttribution: true }}>
      <Background color="#374151" gap={16} />
    </ReactFlow>
  );
}