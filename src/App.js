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
let parentUrl = `http://localhost:3000/`;
let firstClick = true;
let secondClick = false;

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

    const navigate = (path, source) => {
        const targetTab = getTabFromPath(path);
        const currentPath = window.location.pathname;
        const isSameTab = targetTab === currentTab;
        if(isClickSourceBottomBar(source) && isSameTab) {
            console.log('go to l0 of current tab');
            //first click take user to l0 with whatever state it was
            if(firstClick) {
                console.log('firstClick');
                firstClick = false;
                secondClick = true;
                const navigationEntriesUrls = navigation.entries().map(entry => entry.url);
                // console.log(
                //     findParentIndex(navigationEntriesUrls, navigationEntriesUrls[navigationEntriesUrls.length - 1])
                // );
                console.log(parentUrl)
                for(let i= navigationEntriesUrls.length - 1; i >= 0; i--) {
                    if(navigationEntriesUrls[i] === parentUrl) {
                        console.log(navigationEntriesUrls.length - i - 1);
                        const historyEntriesToGoBack  = navigationEntriesUrls.length - i - 1;
                        if(historyEntriesToGoBack === 0) {
                            history.go(0)
                        } else {
                            history.go(-1 * historyEntriesToGoBack);
                        }
                        return;
                    }
                }
                setNavigationHistory((prev) => {
                    return {
                        ...prev,
                        [currentTab]: [currentTab[0]]
                    }
                });
                return;
            }
            if(secondClick) {
                console.log('secondClick');
                secondClick = true;
                window.location.reload();
                firstClick = false;
                return;
            }

        }
        // if (isClickSourceBottomBar() && isSameTab &&  ) {
        //     alert('you clicked same tab, currently not doing anything');
        //     return;
        // }

        if (targetTab !== currentTab) {
            const lastVisitedPageOfTargetTab = navigationHistory[targetTab][navigationHistory[targetTab].length - 1];
            // todo
            firstClick = true;
            secondClick = false;
            if(targetTab === 'home') {
                parentUrl = `http://localhost:3000/`;
            } else {
                parentUrl = `http://localhost:3000/${targetTab}`;
            }
            console.log(parentUrl);

            // IMP SEe how this experience will be inc ase of pages which load
            // data from api.
            for(let i= 0; i < navigationHistory[targetTab].length; i++) {
                browserHistory.push({
                    pathname: navigationHistory[targetTab][i],
                    state: {key: 'currentPath'}
                });
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
                <button className="button" onClick={() => navigate('/', BOTTOMBAR)}>Home</button>
                <button className="button" onClick={() => navigate('/categories', BOTTOMBAR)}>Categories</button>
                <button className="button" onClick={() => navigate('/cart', BOTTOMBAR)}>Cart</button>
            </nav>

        </div>
    );
};

export default App;

