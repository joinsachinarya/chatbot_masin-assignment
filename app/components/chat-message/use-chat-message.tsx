import { Message } from '../../contexts/chat-context';

const useChatMessage = (message: Message) => {
    const isUser = message.role === 'user';
    const isStreaming = message.isStreaming;
        return {
        isUser,
        isStreaming
    }
}

export default useChatMessage   