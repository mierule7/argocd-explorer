import { useState } from 'react';
import { module1Data } from './data/module1';
import TopologyMap from './components/TopologyMap';
import Timeline from './components/Timeline';
import Inspector from './components/Inspector';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentStep = module1Data.steps[currentStepIndex];

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white font-mono">
      <header className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">InfraBlueprint: ArgoCD Core Loop</h1>
      </header>

      <div className="flex-1 grid grid-rows-2 grid-cols-2 gap-2 p-2 overflow-hidden">
        <div className="col-span-2 row-span-1 bg-gray-800 rounded-lg border border-gray-700">
          <ReactFlowProvider>
            <TopologyMap step={currentStep} />
          </ReactFlowProvider>
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800 rounded-lg border border-gray-700">
          <Timeline
            steps={module1Data.steps}
            currentIndex={currentStepIndex}
            onSelectStep={setCurrentStepIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800 rounded-lg border border-gray-700">
          <Inspector step={currentStep} />
        </div>
      </div>
    </div>
  );
}

export default App;