import React from 'react';

const NavigationHistory = ({ navigationHistory }) => {
    console.log(navigationHistory);
    return (
        <div className="navigation-history-container">
            <h2 className="header">Navigation History</h2>
            <div className="history-content">
                {Object.entries(navigationHistory).map(([key, paths]) => (
                    <div className="entry" key={key}>
                        <b className="key">{key}:</b>
                        <span className="paths">
              {Array.isArray(paths)
                  ? ` [${paths.map((path) => `'${path}'`).join(', ')}]`
                  : 'Invalid paths'}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationHistory;
