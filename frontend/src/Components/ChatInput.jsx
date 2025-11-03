import React from 'react';
import { Send, AlertCircle } from 'lucide-react';

const ChatInput = ({ input, setInput, handleSend, handleKeyPress, loading, apiStatus }) => {
    return (
        <div className="input-container">
            {apiStatus === 'error' && (
                <div className="error-banner">
                    <AlertCircle size={18} />
                    <span>Unable to connect to the backend. Please ensure the FastAPI server is running.</span>
                </div>
            )}
            <div className="input-wrapper">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about real estate, investments, financial planning..."
                    rows="1"
                    disabled={loading || apiStatus === 'error'}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading || apiStatus === 'error'}
                    className="send-button"
                >
                    <Send size={20} />
                </button>
            </div>
            <p className="disclaimer">
                AI-generated advice. Always consult with licensed professionals for financial decisions.
            </p>
        </div>
    );
};

export default ChatInput;
