'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from '../chat-input/chat-input';
import useChatInterface from './use-chat-interface';
import ChatMessage from '../chat-message/chat-message';

type ChatInterfaceProps = {
    selectedPrompt?: string | null;
    onPromptProcessed?: () => void;
}

const ChatInterface = ({ selectedPrompt, onPromptProcessed }: ChatInterfaceProps) => {
    const { messages, isLoading, handleSendMessage, messagesEndRef } = useChatInterface({ selectedPrompt, onPromptProcessed });


    return (
            <div className="flex flex-col h-screen bg-gray-50 w-full">
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            MASIN Chat
                        </h1>
                        <p className="text-sm text-gray-600">
                            Your AI conversation partner
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Welcome to MASIN Chat!
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Start a conversation by typing a message below, or try one of the suggested prompts to get started.
                            </p>
                        </motion.div>
                    ) : (
                        messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
    );
}

export default ChatInterface;
