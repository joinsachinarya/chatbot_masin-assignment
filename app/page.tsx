'use client';

import { useState } from 'react';
import { ChatProvider } from './contexts/chat-context';
import ChatInterface from './components/chat-interface/chat-interface';
import SuggestedPrompts from './components/suggested-prompt/suggested-prompt';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-50">
        <SuggestedPrompts onPromptClick={handlePromptClick} />

        <ChatInterface selectedPrompt={selectedPrompt} onPromptProcessed={() => setSelectedPrompt(null)} />
      </div>
    </ChatProvider>
  );
}
