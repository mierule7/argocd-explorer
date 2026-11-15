import { useState } from 'react';

export default function ExamMode({ examData, onExit }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowResult(true);
    if (index === examData[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < examData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Exam Complete!</h2>
        <p className="text-xl text-gray-300 mb-6">
          You scored <span className="text-blue-400 font-bold">{score}</span> out of <span className="text-blue-400 font-bold">{examData.length}</span>
        </p>
        <div className="text-6xl mb-8">{score === examData.length ? '🏆' : score > 0 ? '👍' : '📚'}</div>
        <button 
          onClick={onExit} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
        >
          Back to Learning
        </button>
      </div>
    );
  }

  const question = examData[currentQ];

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white">📝 Knowledge Check</h2>
        <button onClick={onExit} className="text-gray-400 hover:text-white text-sm">✕ Exit Exam</button>
      </div>

      <div className="mb-2 text-sm text-gray-400">Question {currentQ + 1} of {examData.length}</div>
      <h3 className="text-2xl font-bold text-white mb-8">{question.question}</h3>

      <div className="space-y-4 flex-1">
        {question.options.map((option, index) => {
          let btnClass = "w-full text-left p-4 rounded-lg border transition font-medium ";
          
          if (showResult) {
            if (index === question.correct) {
              btnClass += "bg-green-900/50 border-green-500 text-green-200"; 
            } else if (index === selected) {
              btnClass += "bg-red-900/50 border-red-500 text-red-200"; 
            } else {
              btnClass += "bg-gray-800 border-gray-700 text-gray-500"; 
            }
          } else {
            btnClass += "bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-blue-500";
          }

          return (
            <button 
              key={index} 
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <button 
          onClick={nextQuestion}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold w-full"
        >
          {currentQ === examData.length - 1 ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
}