import { useEffect, useRef, useState } from 'react'
import { useChat } from '../../contexts/chat-context';
import { getResponse } from '../../utils/api';

interface UseChatInterfaceProps {
    selectedPrompt?: string | null;
    onPromptProcessed?: () => void;
}

const useChatInterface = ({ selectedPrompt, onPromptProcessed }: UseChatInterfaceProps) => {
    const { messages, addMessage, updateMessage, isLoading, setIsLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const simulateStreamingResponse = async (aiMessageId: string, fullResponse: string) => {
        const words = fullResponse.split(' ');
        let currentContent = '';

        for (let i = 0; i < words.length; i++) {
            currentContent += (i > 0 ? ' ' : '') + words[i];

            updateMessage(aiMessageId, {
                content: currentContent,
                isStreaming: i < words.length - 1
            });

            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        }

        updateMessage(aiMessageId, { isStreaming: false });
        setStreamingMessageId(null);
        setIsLoading(false);
    };

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        addMessage({
            content: content.trim(),
            role: 'user'
        });

        setIsLoading(true);

        const aiResponse = await getResponse(content);

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
    return {
        messages,
        addMessage,
        updateMessage,
        isLoading,
        setIsLoading,
        handleSendMessage,
        handlePromptClick,
        messagesEndRef
    }
}

export default useChatInterface 