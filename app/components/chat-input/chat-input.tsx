'use client';

import { motion } from 'framer-motion';
import useChatInput from './use-chat-input';
import { useChat } from '@/app/contexts/chat-context';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
    const { message, setMessage, handleSend, handleKeyPress } = useChatInput({ onSendMessage, disabled });
    const { isLoading } = useChat();

    return (
        <div className="flex items-center space-x-3 p-4 border-t border-gray-200 bg-white ">
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isLoading ? "Typing..." : "Type your message..."}
                    disabled={disabled}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>
            <motion.button
                whileHover={{ scale: !message.trim() || disabled ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                className={`px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors 
                ${!message.trim() || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
                Enter
            </motion.button>
        </div>
    );
}
