import { Handle, Position } from '@xyflow/react';

export default function CustomNode({ data }) {
  const isActive = data.isActive;

  return (
    <div className={`
      relative flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 shadow-lg
      ${isActive 
        ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-105' 
        : 'bg-gray-800/90 border-gray-600 hover:border-gray-400'}
    `}>
      {/* Left connection point */}
      <Handle type="target" position={Position.Left} className="bg-gray-500! w-2! h-2! border-0!" />
      
      {/* Icon */}
      <div className={`text-2xl transition-transform duration-300 ${isActive ? 'scale-125' : ''}`}>
        {data.icon}
      </div>
      
      {/* Label */}
      <div className={`font-mono text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-blue-100' : 'text-gray-300'}`}>
        {data.label}
      </div>

      {/* Right connection point */}
      <Handle type="source" position={Position.Right} className="bg-gray-500! w-2! h-2! border-0!" />
    </div>
  );
}