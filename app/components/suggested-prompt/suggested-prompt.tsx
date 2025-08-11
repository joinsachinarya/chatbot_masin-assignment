'use client';

import { motion } from 'framer-motion';
import useSuggestedPrompt from './use-suggested-prompt';


interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}


export default function SuggestedPrompts({ onPromptClick }: SuggestedPromptsProps) {
  const { selectedPrompt, handlePromptClick, suggestedQuestions } = useSuggestedPrompt({ onPromptClick });

  return (
    <div className="hidden lg:block w-80 bg-gray-50 border-r border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Suggested Prompts
        </h3>
        <p className="text-sm text-gray-600">
          Click a prompt &amp; get response
        </p>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-140px)] overflow-y-auto overflow-x-hidden">
        {suggestedQuestions.map((prompt: string, index: number) => (
          <motion.button
            key={index}
            id={index === suggestedQuestions.length - 1 ? 'last-prompt' : ''}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePromptClick(prompt)}
            className="text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 text-sm text-gray-700 hover:text-gray-900 w-[90%]"
          >
            {prompt}
          </motion.button>
        ))}
      </div>

    </div>
  );
}
