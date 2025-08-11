'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getContextualResponse } from '../utils/aiResponses';

interface ChatInterfaceProps {
  selectedPrompt?: string | null;
  onPromptProcessed?: () => void;
}

export default function ChatInterface({ selectedPrompt, onPromptProcessed }: ChatInterfaceProps) {
  const { messages, addMessage, updateMessage, isLoading, setIsLoading, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate streaming AI response
  const simulateStreamingResponse = async (aiMessageId: string, fullResponse: string) => {
    const words = fullResponse.split(' ');
    let currentContent = '';

    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i];
      
      updateMessage(aiMessageId, {
        content: currentContent,
        isStreaming: i < words.length - 1
      });

      // Add delay between words to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }

    // Mark as complete
    updateMessage(aiMessageId, { isStreaming: false });
    setStreamingMessageId(null);
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage({
      content: content.trim(),
      role: 'user'
    });

    setIsLoading(true);

    // Get AI response
    const aiResponse = getContextualResponse(content);
    
    // Add AI message placeholder
    const aiMessage = {
      content: '',
      role: 'assistant' as const,
      isStreaming: true
    };
    
    const aiMessageResult = addMessage(aiMessage);
    
    // Start streaming
    setTimeout(() => {
      simulateStreamingResponse(aiMessageResult.id, aiResponse);
    }, 500); // Small delay before starting to show typing indicator
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Handle selected prompt from sidebar
  useEffect(() => {
    if (selectedPrompt && onPromptProcessed) {
      handleSendMessage(selectedPrompt);
      onPromptProcessed();
    }
  }, [selectedPrompt, onPromptProcessed]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              MASIN Chat
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your AI conversation partner
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear the chat?')) {
                  clearChat();
                }
              }}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Welcome to MASIN Chat!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Start a conversation by typing a message below, or try one of the suggested prompts to get started.
              </p>
            </motion.div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </AnimatePresence>
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-600 px-4 py-3">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
