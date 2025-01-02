import React, { useState, useEffect, useRef } from 'react';
import './styles/BottomBar.css';
import './style.css';
import { browserHistory } from 'react-router';
import NavigationHistory from "./NavigationHistory.jsx";
import NavigationEntries from "./NavigationEntries";
const getTabFromPath = (path) => {
    if (path.startsWith('/categories')) return 'categories';
    if (path.startsWith('/cart')) return 'cart';
    return 'home';
};

const App = ({ children }) => {
    const [navigationHistory, setNavigationHistory] = useState({
        home: ['/'],
        categories: ['/categories'],
        cart: ['/cart'],
    });
    const navigationHistoryRef = useRef(navigationHistory);
    console.log(navigationHistory);
    useEffect(() => {
        popstateHandler()
    }, []);
    useEffect(() => {
        navigationHistoryRef.current = navigationHistory;
    }, [navigationHistory]);
    function popstateHandler() {
        window.addEventListener("popstate", function (event) {
            const currentTabRefValue = currentTabRef.current;
            const navigationHistoryRefValue = navigationHistoryRef.current;
            // find a workaround to know below is triggered only for back event
            const currentTabEntries = navigationHistoryRefValue[currentTabRefValue];
            if(currentTabEntries.length === 1) {
                // TODO
                // if current is home tab then exit the webapp
                // if current is not home tab, take user to previous tab journey
                return;
            }
            // navigationHistory[currentTab].pop();
            setNavigationHistory((prev) => {
                return {
                    ...prev,
                    [currentTabRefValue]: navigationHistoryRefValue[currentTabRefValue].slice(0,-1)
                }
            });
            const nextPath  = navigationHistoryRefValue[currentTabRefValue][navigationHistoryRefValue[currentTabRefValue].length - 2];
            console.log('nextPath',nextPath)
            browserHistory.push(nextPath);
            // history.pushState({path: nextPath}, '', nextPath);
            // trying since pointer is not moving to next state after doing history.pushState
            // browserHistory.go(1);
        });
    }

    const [currentTab, setCurrentTab] = useState('home');
    const currentTabRef = useRef(currentTab);

    useEffect(() => {
        currentTabRef.current = currentTab;
    }, [currentTab]);

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
            // history.replaceState({ path: lastVisitedPageOfTargetTab }, '', lastVisitedPageOfTargetTab);
            setCurrentTab(targetTab);
            return;
        }

        browserHistory.replace(path);
        // history.replaceState({ path: path }, '', path);
        updateNavigationHistory(targetTab, path, 'add');
    };


    return (
        <div>
            <div className='container'>
                <div>{children && React.cloneElement(children, {navigate})}</div>
                <h3 className="header">Browsers navigation history entries</h3>
                <NavigationEntries />
                <NavigationHistory navigationHistory={navigationHistory}/>
            </div>
            <nav className="navBar">
                <button className="button"  onClick={() => navigate('/')}>Home</button>
                <button className="button" onClick={() => navigate('/categories')}>Categories</button>
                <button className="button" onClick={() => navigate('/cart')}>Cart</button>
            </nav>

        </div>
    );
};

export default App;

