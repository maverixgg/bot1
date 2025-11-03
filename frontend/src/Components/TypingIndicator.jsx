import React from 'react';
import { TrendingUp } from 'lucide-react';

const TypingIndicator = () => {
    return (
        <div className="message assistant">
            <div className="message-content">
                <div className="avatar assistant-avatar">
                    <TrendingUp size={20} />
                </div>
                <div className="message-text">
                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
