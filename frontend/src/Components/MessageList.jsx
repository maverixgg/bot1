import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, loading, messagesEndRef, formatMessage }) => {
    return (
        <div className="messages-container">
            {messages.map((message, index) => (
                <ChatMessage 
                    key={index} 
                    message={message} 
                    formatMessage={formatMessage}
                />
            ))}
            
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
