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
    const [virtualHistory, setVirtualHistory] = useState(['/']);
    const navigationHistoryRef = useRef(navigationHistory);
    const [currentTab, setCurrentTab] = useState('home');
    const currentTabRef = useRef(currentTab);
    // console.log(navigationHistory);
    useEffect(() => {
        popstateHandler()
    }, []);
    useEffect(() => {
        navigationHistoryRef.current = navigationHistory;
    }, [navigationHistory]);
    useEffect(() => {
        currentTabRef.current = currentTab;
    }, [currentTab]);
    function popstateHandler() {
        window.addEventListener("popstate", function (event) {
            const currentTabRefValue = currentTabRef.current;
            const navigationHistoryRefValue = navigationHistoryRef.current;
            const currentTabEntries = navigationHistoryRefValue[currentTabRefValue];
            setNavigationHistory((prev) => {
                return {
                    ...prev,
                    [currentTabRefValue]: navigationHistoryRefValue[currentTabRefValue].slice(0,-1)
                }
            });
        });
    }

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
            return updatedHistory;
        });
    }

    const navigate = (path) => {
        const targetTab = getTabFromPath(path);

        const lastVisitedPageOfTargetTab = navigationHistory[targetTab][navigationHistory[targetTab].length - 1];
        if (targetTab !== currentTab) {
            // IMP SEe how this experience will be inc ase of pages which load
            // data from api.
            for(let i= 0; i < navigationHistory[targetTab].length; i++) {
                browserHistory.push(navigationHistory[targetTab][i]);
            }
            setVirtualHistory((prev) => ([...prev, lastVisitedPageOfTargetTab]));
            setCurrentTab(targetTab);
            return;
        }


        setVirtualHistory((prev) => ([...prev, path]));
        browserHistory.push(path);
        updateNavigationHistory(targetTab, path, 'add');
    };

    return (
        <div>
            <div className='container'>
                <div>{children && React.cloneElement(children, {navigate})}</div>
                <div style={{display: 'flex'}}>
                    {/* <div style={{borderRight: '1px solid black'}}>*/}
                    {/*    <div className="header">Virtual History</div>*/}
                    {/*    <div className="virtualHistoryContainer">*/}
                    {/*        {virtualHistory.map((virtualHistoryEntry, index) => {*/}
                    {/*            return <div style={{fontSize: 14}}>{virtualHistoryEntry}</div>*/}
                    {/*        })}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div>
                        <div className="header">Browsers navigation history entries</div>
                        <NavigationEntries/>
                    </div>

                </div>
                <NavigationHistory navigationHistory={navigationHistory}/>
            </div>
            <nav className="navBar">
                <button className="button" onClick={() => navigate('/')}>Home</button>
                <button className="button" onClick={() => navigate('/categories')}>Categories</button>
                <button className="button" onClick={() => navigate('/cart')}>Cart</button>
            </nav>

        </div>
    );
};

export default App;

