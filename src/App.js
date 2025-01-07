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

const BOTTOMBAR = 'bottombar';
const isClickSourceBottomBar = (source) => {
    return source === BOTTOMBAR;
}

let tabClickStateInitialState = {
    'home': {firstClick: false, secondClick: false},
    'categories': {firstClick: false, secondClick: false},
    'cart': {firstClick: false, secondClick: false}
};
let tabClickState = JSON.parse(JSON.stringify(tabClickStateInitialState));

const parentUrlPrefix = process.env.NODE_ENV === 'development' ? `http://localhost:3000/` : 'https://bottombarpoc.vercel.app/';
let parentUrl = parentUrlPrefix;
function resetTabsClickState() {
    tabClickState = JSON.parse(JSON.stringify(tabClickStateInitialState));
}
const App = ({ children }) => {
    const [navigationHistory, setNavigationHistory] = useState({
        home: ['/'],
        categories: ['/categories'],
        cart: ['/cart'],
    });
    const navigationHistoryRef = useRef(navigationHistory);
    const [currentTab, setCurrentTab] = useState('home');
    const currentTabRef = useRef(currentTab);

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
        console.log('popstateHandler triggerd')
        window.addEventListener("popstate", function (event) {
            const currentTabRefValue = currentTabRef.current;
            const navigationHistoryRefValue = navigationHistoryRef.current;

            setNavigationHistory((prev) => {
                return {
                    ...prev,
                    [currentTabRefValue]: navigationHistoryRefValue[currentTabRefValue].slice(0,-1)
                }
            });
        });
    }
    console.log(navigationHistory, currentTab)
    function updateNavigationHistory(tab, path, action = 'add') {
        console.log('updateNavigationHistory');
        if (!tab) return;
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
    const navigate = (path, source, tab) => {
        const targetTab = getTabFromPath(path);
        const isSameTab = targetTab === currentTab;
        if (targetTab !== currentTab) {
            resetTabsClickState();
            if(targetTab === 'home') {
                parentUrl = parentUrlPrefix;
            } else {
                parentUrl = `${parentUrlPrefix}${targetTab}`;
            }
            // IMP SEe how this experience will be inc ase of pages which load
            // data from api.
            setCurrentTab(targetTab);
            // below code is written becasue facing issue
            // when first time tab is clicked when on same tab,
            // navigationhistory is not getting updated properly
            if(navigationHistory[targetTab].length === 0) {
                setNavigationHistory((prev) => {
                    return {
                        ...prev,
                        [targetTab]: [`/${targetTab === 'home' ? '' : targetTab}`]
                    }
                });
                browserHistory.push(`/${targetTab}`);
                return;
            }
            for(let i= 0; i < navigationHistory[targetTab].length; i++) {
                browserHistory.push(navigationHistory[targetTab][i])
                // browserHistory.push({
                //     pathname: navigationHistory[targetTab][i],
                //     state: {key: currentPath}
                // });
            }

            return;
        }
        if(isClickSourceBottomBar(source) && isSameTab && !tabClickState[tab].firstClick) {
            console.log('go to l0 of current tab');
            //first click take user to l0 with whatever state it was

                console.log('firstClick');
                tabClickState[tab].firstClick = true;
                const navigationEntriesUrls = navigation.entries().map(entry => entry.url);
                console.log(parentUrl)
                for(let i= navigationEntriesUrls.length - 1; i >= 0; i--) {
                    if(navigationEntriesUrls[i] === parentUrl) {
                        console.log(navigationEntriesUrls.length - i - 1);
                        const historyEntriesToGoBack  = navigationEntriesUrls.length - i - 1;
                        const currentTabRefValue = currentTabRef.current;
                        //this is not working as expected.
                        setNavigationHistory(prev => {
                            const updatedHistory = { ...prev };
                            // somehow this is not working
                            updatedHistory[currentTabRefValue] = [`/${currentTabRefValue}`];
                            return updatedHistory;
                        });

                        if(historyEntriesToGoBack === 0) {
                            return;
                        } else {
                            history.go(-1 * historyEntriesToGoBack);
                        }
                        return;
                    } else {
                        console.log("didn't find parent url")
                    }
                }
        }

        if(isClickSourceBottomBar(source) && isSameTab && !tabClickState[tab].secondClick) {
                console.log('secondClick');
                tabClickState[tab].secondClick = true;
                return;
        }
        if(isClickSourceBottomBar(source) && isSameTab && tabClickState[tab].firstClick && tabClickState[tab].secondClick) {
            return;
        }
        if(navigationHistory[currentTab].length === 0) {
            setNavigationHistory((prev) => {
                return {
                    ...prev,
                    [currentTab]: [`/${currentTab === 'home' ? '' : targetTab}`]
                }
            });
            browserHistory.push(path);
        } else {
            browserHistory.push(path);

        }
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
                <button className="button" onClick={() => navigate('/', BOTTOMBAR, 'home')}>Home</button>
                <button className="button" onClick={() => navigate('/categories', BOTTOMBAR, 'categories')}>Categories</button>
                <button className="button" onClick={() => navigate('/cart', BOTTOMBAR, 'cart')}>Cart</button>
            </nav>

        </div>
    );
};

export default App;

