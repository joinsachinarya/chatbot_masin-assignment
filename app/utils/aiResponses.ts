// Mock AI responses for different types of queries
export const mockResponses = [
  "I'd be happy to help you with that! Let me break it down step by step...",
  "That's an interesting question. Here's what I think about it...",
  "Great question! Let me explain this in detail...",
  "I understand what you're asking. Here's my perspective...",
  "That's a fascinating topic! Let me dive deeper into it...",
  "I'm glad you asked that. Here's what you need to know...",
  "Excellent question! Let me provide you with a comprehensive answer...",
  "That's something I can definitely help you with. Here's the breakdown...",
  "I love this question! Let me share my thoughts on it...",
  "That's a great point. Let me elaborate on this...",
  "I'm excited to answer this! Here's what I think...",
  "That's an important question. Let me address it thoroughly...",
  "I appreciate you asking this. Here's my detailed response...",
  "That's a complex topic. Let me simplify it for you...",
  "I'm here to help! Let me explain this clearly...",
  "That's a thoughtful question. Here's my analysis...",
  "I'm glad we're discussing this. Let me share my insights...",
  "That's a great observation. Let me expand on it...",
  "I'm here to assist you. Let me break this down...",
  "That's an excellent point. Let me provide more context..."
];

// Suggested prompts for the sidebar
export const suggestedPrompts = [
  "Tell me more about this topic",
  "Can you explain this further?",
  "What are the key points?",
  "How does this work?",
  "Can you give me an example?",
  "What are the benefits?",
  "How can I apply this?",
  "What should I consider?",
  "Can you break this down?",
  "What's your opinion on this?",
  "How does this compare to...?",
  "What are the alternatives?",
  "Can you elaborate on that?",
  "What are the implications?",
  "How would you approach this?"
];

// Function to get a random response
export function getRandomResponse(): string {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

// Function to simulate streaming response (not currently used)
// export function* streamResponse(response: string): Generator<string> {
//   const words = response.split(' ');
//   for (let i = 0; i < words.length; i++) {
//     yield words.slice(0, i + 1).join(' ');
//     // Add a small delay to simulate real streaming
//     yield new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
//   }
// }

// Function to get contextual response based on user message
export function getContextualResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to help you with any questions or topics you'd like to discuss. What would you like to know more about?";
  }
  
  if (lowerMessage.includes('how are you')) {
    return "I'm doing well, thank you for asking! I'm ready to help you with whatever you need. What's on your mind today?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! I'm glad I could help. Is there anything else you'd like to discuss or learn more about?";
  }
  
  if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
    return "I'd be happy to explain that! Let me break it down in a way that's easy to understand. Here's what you need to know...";
  }
  
  if (lowerMessage.includes('example') || lowerMessage.includes('instance')) {
    return "Great idea! Let me give you a concrete example to help illustrate this concept. Here's how it works in practice...";
  }
  
  if (lowerMessage.includes('compare') || lowerMessage.includes('difference')) {
    return "Excellent question! Let me compare these approaches and highlight the key differences. Here's what sets them apart...";
  }
  
  // Default response
  return getRandomResponse();
}
