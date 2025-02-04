import React from 'react';
export default function NavigationEntries() {
    const urls = navigation.entries().map(entry => entry.url);
    return urls.map(url => {
        return <div style={{display:'flex', flexDirection: 'column', fontSize: 14, padding: 2}}>{url}</div>
    });
}
