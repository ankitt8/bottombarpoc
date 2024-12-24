import React, { useState, useEffect } from 'react';
import './styles/BottomBar.css';
import { browserHistory } from 'react-router';
import NavigationHistory from "./NavigationHistory.jsx";
import NavigationEntries from "./NavigationEntries";
const getTabFromPath = (path) => {
    if (path.startsWith('/categories')) return 'categories';
    if (path.startsWith('/cart')) return 'cart';
    return 'home';
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    navBar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
        padding: '10px 0',
    },
    button: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    content: {
        flex: 1,
        paddingBottom: '50px', // Space for the bottom navigation bar
    },
}

const App = ({ children }) => {
    const [navigationHistory, setNavigationHistory] = useState({
        home: ['/'],
        categories: ['/categories'],
        cart: ['/cart'],
    });
    useEffect(() => {
        window.addEventListener("popstate", function (event) {
            // find a workaround to know below is triggered only for back event
            const currentTabEntries = navigationHistory[currentTab];
            if(currentTabEntries.length === 1) {
                // if current is home tab then exit the webapp
                // if current is not home tab, take user to previous tab journey
                return;
            }
            navigationHistory[currentTab].pop();
            const nextPath  = navigationHistory[currentTab][navigationHistory[currentTab].length - 1];
            browserHistory.push(nextPath);
            // trying since pointer is not moving to next state after doing history.pushState
            history.go(1);
        })
    }, []);
    const [currentTab, setCurrentTab] = useState('home');
    function updateNavigationHistory(tab, path, action = 'add') {
        if (!tab) return;
        console.log(action)
        setNavigationHistory((prev) => {
            const updatedHistory = { ...prev };

            if (action === 'add') {
                updatedHistory[tab] = [...updatedHistory[tab], path];
            } else if (action === 'remove') {
                updatedHistory[tab] = updatedHistory[tab].slice(0, -1);
            }

            console.log('Updated navigation history:', updatedHistory);
            return updatedHistory;
        });
    }


    const navigate = (path) => {
        const targetTab = getTabFromPath(path);

        const lastVisitedPageOfTargetTab = navigationHistory[targetTab][navigationHistory[targetTab].length - 1];
        console.log(lastVisitedPageOfTargetTab);

        // If switching tabs, navigate to the last visited page of the target tab
        if (targetTab !== currentTab) {
            console.log('Switching tabs, the last visited page of the target tab is:', lastVisitedPageOfTargetTab);

            // Replace the browser history to the last visited page of the target tab
            browserHistory.replace(lastVisitedPageOfTargetTab);
            setCurrentTab(targetTab);
            return;
        }

        console.log('Normal navigation, navigating to path:', path);

        // Push the new path to the browser history
        browserHistory.replace(path);
        updateNavigationHistory(targetTab, path, 'add');
    };


    return (
        <div>
            <>
                <div>{children && React.cloneElement(children, {navigate})}</div>
                <h3 className="header">Browsers navigation history entries</h3>
                <NavigationEntries/>
                <NavigationHistory navigationHistory={navigationHistory}/>
            </>
            <nav style={styles.navBar}>
                <button style={styles.button}  onClick={() => navigate('/')}>Home</button>
                <button style={styles.button} onClick={() => navigate('/categories')}>Categories</button>
                <button style={styles.button} onClick={() => navigate('/cart')}>Cart</button>
            </nav>

        </div>
    );
};

export default App;

