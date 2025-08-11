'use client';

import { motion } from 'framer-motion';
import { suggestedPrompts } from '../utils/aiResponses';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

export default function SuggestedPrompts({ onPromptClick }: SuggestedPromptsProps) {
  return (
    <div className="hidden lg:block w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Suggested Prompts
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click on any prompt to start a conversation
        </p>
      </div>
      
      <div className="space-y-3">
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPromptClick(prompt)}
            className="w-full text-left p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all duration-200 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Pro Tip
        </h4>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Try asking follow-up questions to dive deeper into any topic. The more specific you are, the better I can help!
        </p>
      </div>
    </div>
  );
}
