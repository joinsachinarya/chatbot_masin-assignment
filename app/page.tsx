'use client';

import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import ChatInterface from './components/ChatInterface';
import SuggestedPrompts from './components/SuggestedPrompts';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          {/* Suggested Prompts Sidebar */}
          <SuggestedPrompts onPromptClick={handlePromptClick} />
          
          {/* Main Chat Interface */}
          <div className="flex-1">
            <ChatInterface selectedPrompt={selectedPrompt} onPromptProcessed={() => setSelectedPrompt(null)} />
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}
