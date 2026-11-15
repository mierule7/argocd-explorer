import { useState } from 'react';
import { modules } from './data/index'; // Import the module menu
import TopologyMap from './components/TopologyMap';
import Timeline from './components/Timeline';
import Inspector from './components/Inspector';
import ExamMode from './components/ExamMode';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('learn');

  const currentModule = modules.find(m => m.id === selectedModuleId);
  const currentStep = currentModule.data.steps[currentStepIndex];

  // Reset the view when the user changes the module
  const handleModuleChange = (e) => {
    setSelectedModuleId(Number(e.target.value));
    setCurrentStepIndex(0);
    setMode('learn');
    setIsPlaying(false);
  };

  if (mode === 'exam') {
    return (
      <div className="h-screen w-screen flex flex-col bg-gray-900 text-white font-mono">
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">InfraBlueprint: Exam Mode</h1>
          <button onClick={() => setMode('learn')} className="text-gray-400 hover:text-white">✕ Exit Exam</button>
        </header>
        <div className="flex-1 bg-gray-800 m-2 rounded-lg border border-gray-700 overflow-hidden">
          <ExamMode examData={currentModule.data.exam} onExit={() => setMode('learn')} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white font-mono">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-400">InfraBlueprint</h1>
          
          {/* THE DROPDOWN MENU */}
          <select 
            value={selectedModuleId} 
            onChange={handleModuleChange}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer"
          >
            {modules.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>

        {currentStepIndex === currentModule.data.steps.length - 1 && (
          <button 
            onClick={() => setMode('exam')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold animate-pulse"
          >
            🎓 Take Exam
          </button>
        )}
      </header>

      <div className="flex-1 grid grid-rows-2 grid-cols-2 gap-2 p-2 overflow-hidden">
        <div className="col-span-2 row-span-1 bg-gray-800 rounded-lg border border-gray-700">
          <ReactFlowProvider>
            <TopologyMap step={currentStep} />
          </ReactFlowProvider>
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800 rounded-lg border border-gray-700">
          <Timeline
            steps={currentModule.data.steps}
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