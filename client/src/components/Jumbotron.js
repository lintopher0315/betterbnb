import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useHistory } from 'react-router-dom';

function Jumbotron(props) {

    let history = useHistory();

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
                    onChange={({suggestion}) => {
                        history.push({
                            pathname: '/results',
                            name: suggestion.name,
                            coord: suggestion.latlng
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Jumbotron;