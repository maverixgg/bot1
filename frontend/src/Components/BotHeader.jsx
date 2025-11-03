import { TrendingUp } from 'lucide-react';
import React from 'react';

const BotHeader = ({ apiStatus }) => {
    return (
        <header className="chat-header">
            <div className="header-content">
                <div className="header-title">
                    <TrendingUp size={28} />
                    <h1>Nexaur AI</h1>
                </div>
                <div className={`status-indicator ${apiStatus}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">
                        {apiStatus === 'ready' ? 'Connected' : apiStatus === 'loading' ? 'Loading Model...' : 'Disconnected'}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default BotHeader;