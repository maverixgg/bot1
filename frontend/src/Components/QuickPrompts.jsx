import React from 'react';
import { Home, DollarSign, TrendingUp } from 'lucide-react';

const QuickPrompts = ({ setInput }) => {
    const quickPrompts = [
        { icon: <Home size={18} />, text: 'What are current real estate investment trends?' },
        { icon: <DollarSign size={18} />, text: 'How should I diversify my portfolio?' },
        { icon: <TrendingUp size={18} />, text: 'What are the best markets for property investment?' }
    ];

    return (
        <div className="quick-prompts">
            <p className="quick-prompts-title">Quick Questions:</p>
            <div className="prompt-buttons">
                {quickPrompts.map((prompt, index) => (
                    <button
                        key={index}
                        className="prompt-button"
                        onClick={() => setInput(prompt.text)}
                    >
                        {prompt.icon}
                        <span>{prompt.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickPrompts;
