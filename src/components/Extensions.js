import React from 'react';

function Extensions() {

    return (
        <div id="extension-container">
            <div id="extension-text-header">
                Get the browser extension
            </div>
            <div id="extension-text">
                On a booking site and completely overwhelmed? Our browser extension will
            </div>
            <br />
            <div id="extension-text" style={{paddingTop: '8px'}}>
                detect online listings and present relevant info about a specific booking.
            </div>
            <div id="icon-container">
                <img alt="" src={require("../res/chrome.png")} style={{paddingRight: '150px'}}/>
                <img alt="" src={require("../res/firefox.png")}/>
            </div>
        </div>
    )
}

export default Extensions;