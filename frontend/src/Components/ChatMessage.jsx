import React from 'react';
import { TrendingUp } from 'lucide-react';

const ChatMessage = ({ message, formatMessage }) => {
    return (
        <div className={`message ${message.role}`}>
            <div className="message-content">
                {message.role === 'assistant' && (
                    <div className="avatar assistant-avatar">
                        <TrendingUp size={20} />
                    </div>
                )}
                <div className="message-text">
                    {formatMessage(message.content)}
                </div>
                {message.role === 'user' && (
                    <div className="avatar user-avatar">
                        You
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
