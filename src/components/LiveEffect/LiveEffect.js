import React from 'react';
import './LiveEffect.css';

const LiveEffect = () => {
    return (
        <div>
            <div className="container">
                <div className="live-effect-container">
                    <span className='live-text' >Live</span>
                    <span className='live-effect' ></span>
                </div>
            </div>
        </div>
    );
};

export default LiveEffect;