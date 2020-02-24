import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';

function Jumbotron() {

    return (
        <div id="container">
            <div id="container-text">
                Travel safe with BetterBNB
            </div>
            <div id="location-container">
                <AlgoliaPlaces
                    placeholder={"Search a location"}
                    style={{
                        borderRadius: '10px',
                    }}
                />
            </div>
        </div>
    )
}

export default Jumbotron;