import React, { useState } from 'react'

const suggestedQuestions = [
    "Hi, how are you?",
    "How are you doing?",
    "How was your day?",
    "What's up?",
    "Good morning!",
    "Good afternoon!",
    "Good evening!",
    "Can you help me?",
    "What do you think?",
    "That's interesting",
    "Tell me more",
    "I agree",
    "I disagree"
  ];

interface UseSuggestedPromptProps {
    onPromptClick: (prompt: string) => void;
}

const useSuggestedPrompt = ({ onPromptClick }: UseSuggestedPromptProps) => {
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

    const handlePromptClick = (prompt: string) => {
      setSelectedPrompt(prompt);
      onPromptClick(prompt);
    };
  
  return {
    selectedPrompt,
    handlePromptClick,
    suggestedQuestions  
  };
};

export default useSuggestedPrompt;