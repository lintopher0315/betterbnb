import React from 'react';

function Info() {

    return (
        <div>
            <div id="info-text-header">
                Easy and efficient, like it should be
            </div>
            <div id="info-text">
                Don't waste your time researching listings on booking websites.
            </div>
            <br />
            <div id="info-text" style={{paddingTop: '8px'}}>
                Betterbnb provides you with the most up-to-date info with no hassle.
            </div>
            <img id="plane-image" alt="" src={require("../res/paper_plane.png")}/>
        </div>
    )
}

export default Info;