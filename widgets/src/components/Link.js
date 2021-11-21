import React from 'react';

const Link = ({ href, className, children }) => {
    const onClick = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();//stop refresing the full page
        window.history.pushState({}, '', href);//tell that the url has changed, and we have to update the content
        const navEvent = new PopStateEvent('popState');
        window.dispatchEvent(navEvent);//to tell the components which have used url in App componnet that the url has changed.

    }
    return (
        <a onClick={onClick} href={href} className={className}>{children}</a>
    );
}
export default Link;