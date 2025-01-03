import React, { useEffect, useState } from 'react';
import './NavigationHistory.css';

const NavigationHistory = ({ navigationHistory }) => {
    const [previousHistory, setPreviousHistory] = useState({});
    const [animatedPaths, setAnimatedPaths] = useState({});

    useEffect(() => {
        const newAnimatedPaths = {};

        // Compare current navigationHistory with the previous one
        Object.entries(navigationHistory).forEach(([key, paths]) => {
            if (Array.isArray(paths)) {
                const prevPaths = previousHistory[key] || [];
                const newPaths = paths.filter((path) => !prevPaths.includes(path));
                if (newPaths.length > 0) {
                    newAnimatedPaths[key] = newPaths;
                }
            }
        });

        // Update animatedPaths state
        if (Object.keys(newAnimatedPaths).length > 0) {
            setAnimatedPaths((prev) => ({ ...prev, ...newAnimatedPaths }));

            // Remove animation class after a delay
            setTimeout(() => {
                setAnimatedPaths({});
            }, 1000); // Match animation duration
        }

        // Update previousHistory
        setPreviousHistory(navigationHistory);
    }, [navigationHistory]);

    return (
        <div className="navigation-history-container">
            <h2 className="header">Navigation History</h2>
            <div className="history-content">
                {Object.entries(navigationHistory).map(([key, paths]) => (
                    <div className="entry" key={key}>
                        <div className="key">{key}:</div>
                        <span className="paths">
                            {Array.isArray(paths)
                                ? paths.map((path, index) => (
                                    <span
                                        key={index}
                                        className={`path ${
                                            animatedPaths[key]?.includes(path) ? 'animate' : ''
                                        }`}
                                    >
                                          {`'${path}'`}
                                        {index < paths.length - 1 && ', '}
                                      </span>
                                ))
                                : 'Invalid paths'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationHistory;
