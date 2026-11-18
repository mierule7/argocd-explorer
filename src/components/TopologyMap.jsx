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
  
  // Module 4 nodes: Spread out further to the right to prevent overlap
  { id: 'rollout-controller', position: { x: 800, y: 0 }, data: { label: 'Rollout Controller', icon: '🚀' } },
  { id: 'ingress', position: { x: 1150, y: 0 }, data: { label: 'Ingress (Traffic)', icon: '🌐' } },
  { id: 'prometheus', position: { x: 1150, y: 200 }, data: { label: 'Prometheus', icon: '📊' } },
  // Module 6 (Terraform) nodes
  { id: 'ci-runner', position: { x: 800, y: 100 }, data: { label: 'CI Runner', icon: '⚙️' } },
  { id: 'terraform', position: { x: 1000, y: 0 }, data: { label: 'Terraform', icon: '🟣' } },
  { id: 'aws', position: { x: 1000, y: 200 }, data: { label: 'AWS Cloud', icon: '☁️' } },
  { id: 'terraform-state', position: { x: 1200, y: 100 }, data: { label: 'State File', icon: '📄' } },
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
  
  // Module 4 Edges
  { id: 'k8s-rollout', source: 'k8s-api', target: 'rollout-controller', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'rollout-ingress', source: 'rollout-controller', target: 'ingress', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'ingress-prometheus', source: 'ingress', target: 'prometheus', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'prometheus-rollout', source: 'prometheus', target: 'rollout-controller', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  // Terraform Edges
  { id: 'github-ci', source: 'github', target: 'ci-runner', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'ci-terraform', source: 'ci-runner', target: 'terraform', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'terraform-aws', source: 'terraform', target: 'aws', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  { id: 'terraform-state', source: 'terraform', target: 'terraform-state', markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
];

const nodeTypes = { custom: CustomNode };

export default function TopologyMap({ step, visibleNodes }) {
  const nodesToShow = visibleNodes 
    ? baseNodes.filter(n => visibleNodes.includes(n.id)) 
    : baseNodes;

  const styledNodes = nodesToShow.map(n => ({
    ...n,
    type: 'custom', 
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