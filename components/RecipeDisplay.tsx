
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface RecipeDisplayProps {
  recipe: string | null;
  isLoading: boolean;
  error: string | null;
}

const SimpleMarkdownParser: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
  
    return (
      <div className="prose prose-invert max-w-none prose-h1:text-emerald-400 prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-slate-600 prose-h2:pb-2 prose-strong:text-slate-100">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mb-4">{line.substring(2)}</h1>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
          }
          if (line.match(/^\d+\.\s/)) {
            return <li key={index} className="ml-5 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
          }
          if (line.trim() === '') {
            return <br key={index} />;
          }
          // Simple bold handling
          const parts = line.split('**');
          return (
            <p key={index} className="my-2">
              {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          );
        })}
      </div>
    );
  };
  

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-slate-400">
        <svg className="animate-spin h-10 w-10 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-lg">Chef Gemini is thinking...</p>
        <p>Crafting a delicious recipe just for you!</p>
    </div>
);


export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
        <h3 className="font-bold">Oops! Something went wrong.</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (recipe) {
    return <SimpleMarkdownParser text={recipe} />;
  }

  return (
    <div className="text-center text-slate-400">
      <SparklesIcon className="mx-auto h-12 w-12 text-slate-500 mb-4" />
      <h3 className="font-semibold text-lg">Your recipe will appear here</h3>
      <p>Add your ingredients, set your preferences, and click "Generate Recipe" to start!</p>
    </div>
  );
};
