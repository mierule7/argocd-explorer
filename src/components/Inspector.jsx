import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Inspector({ step }) {
  if (!step?.inspector) return <div className="p-4 text-gray-500">Select a step to inspect.</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
        <span className="font-bold text-green-400">🔍 {step.inspector.title}</span>
        <span className="text-xs bg-gray-700 px-2 py-1 rounded uppercase">{step.inspector.type}</span>
      </div>
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={step.inspector.type === 'diff' || step.inspector.type === 'http' ? 'bash' : step.inspector.type}
          style={atomOneDark}
          customStyle={{ margin: 0, height: '100%', fontSize: '14px' }}
          showLineNumbers
        >
          {step.inspector.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}