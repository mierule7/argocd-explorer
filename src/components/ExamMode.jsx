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
       