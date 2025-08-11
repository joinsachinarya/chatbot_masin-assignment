'use client';

import { motion } from 'framer-motion';
import { Message } from '../../contexts/chat-context';
import useChatMessage from './use-chat-message';

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const { isUser, isStreaming } = useChatMessage(message);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-3 ${isUser
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-600'
                    }`}
            >
                <div className="text-sm leading-relaxed">
                    {isStreaming ? (
                        <div className="flex items-center space-x-2">
                            <span>{message.content}</span>
                        </div>
                    ) : (
                        <span>{message.content}</span>
                    )}
                </div>
                <div
                    className={`text-xs mt-2 opacity-70 ${isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </motion.div>
    );
}
