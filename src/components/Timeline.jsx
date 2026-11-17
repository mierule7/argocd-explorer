import { useEffect } from 'react';

export default function Timeline({ steps, currentIndex, onSelectStep, isPlaying, setIsPlaying }) {
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        onSelectStep((prev) => {
          if (prev + 1 >= steps.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length, onSelectStep, setIsPlaying]);

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
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span className="font-bold text-gray-500">#{step.id}</span>
              <span>{step.time}</span>
            </div>

            {/* The packet header line: SOURCE → DESTINATION (only if from/to exist) */}
            {step.from && step.to && (
              <div className="text-[11px] font-mono text-green-400/80 mb-1">
                {step.from} <span className="text-gray-500">→</span> {step.to}
              </div>
            )}

            <div className="font-bold text-white">{step.title}</div>
            <div className="text-sm text-gray-300 mt-1">{step.lesson}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}