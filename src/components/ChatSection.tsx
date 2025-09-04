import React, { useState, useEffect, useRef } from 'react';
import { chatWithAI } from '../services/geminiApi';
import { FaSpinner, FaPaperPlane } from 'react-icons/fa';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSectionProps {
  problemTitle: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ problemTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_history_${problemTitle}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([]);
    }
  }, [problemTitle]);

  useEffect(() => {
    localStorage.setItem(`chat_history_${problemTitle}`, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, problemTitle]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;

    const userMessageContent = input;
    const userMessage = { role: 'user', content: userMessageContent } as ChatMessage;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // FIX: Remove the problemTitle argument from this line
      const response = await chatWithAI(updatedMessages, userMessageContent);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I am unable to connect to the AI at the moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extension-section chat-section">
      <h3>Chat with AI</h3>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && <p className="chat-welcome">Ask questions about the problem, test cases, or different approaches.</p>}
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : <FaPaperPlane />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;