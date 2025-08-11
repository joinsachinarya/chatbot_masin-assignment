import { useState, KeyboardEvent } from 'react'

interface UseChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

const useChatInput = ({ onSendMessage, disabled }: UseChatInputProps) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
      if (message.trim() && !disabled) {
        onSendMessage(message.trim());
        setMessage('');
      }
    };
  
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
  return {
    message,
    setMessage,
    handleSend,
    handleKeyPress
  }
}

export default useChatInput 