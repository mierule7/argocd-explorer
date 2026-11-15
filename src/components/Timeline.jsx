import { useEffect } from 'react';

export default function Timeline({ steps, currentIndex, onSelectStep, isPlaying, setIsPlaying }) {
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        onSelectStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length, onSelectStep]);

  return (
    <div className="p-4 overflow-y-auto h-full">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => onSelectStep(Math.max(0, currentIndex - 1))} className="bg-gray-600 px-3 py-2 rounded text-white">◀</button>
        <button onClick={() => onSelectStep(Math.min(steps.length - 1, currentIndex + 1))} className="bg-gray-600 px-3 py-2 rounded text-white">▶</button>
      </div>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={step.id}
            onClick={() => onSelectStep(index)}
            className={`p-3 rounded cursor-pointer border transition ${
              index === currentIndex ? 'border-blue-500 bg-blue-900/30' : 'border-gray-700 hover:bg-gray-700'
            }`}
          >
            <div className="text-xs text-gray-400">{step.time}</div>
            <div className="font-bold text-white">{step.title}</div>
            <div className="text-sm text-gray-300 mt-1">{step.lesson}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}