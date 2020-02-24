import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import AlgoliaPlaces from 'algolia-places-react';

import ListingCard from './ListingCard.js'

function SearchResults() {
    return (
        <div>
            <div id="listing-location-container">
                <AlgoliaPlaces
                    placeholder={"Search a location"}
                    style={{
                        borderRadius: '10px',
                    }}
                />
            </div>
            <Container id="results-container" fluid={true}>
                <Row id="results-row">
                    <Col>
                        <ListingCard
                            img="https://cdn.cnn.com/cnnnext/dam/assets/160506135321-hong-kong-hotel-park-lane-super-169.jpg"
                            title="Beautiful Sea Apartment"
                            loc="Singapore"
                            rating={4.0}
                            price="$26 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://cdn.cnn.com/cnnnext/dam/assets/160506135313-hong-kong-hotel-peninsula-super-169.jpg"
                            title="Hong Kong Peninsula Hotel"
                            loc="Hong Kong"
                            rating={3.0}
                            price="$32 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://www.elitetraveler.com/wp-content/uploads/2013/06/night-view4.jpg"
                            title="Mandarin Oriental"
                            loc="San Francisco"
                            rating={3.0}
                            price="$43 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://travel.home.sndimg.com/content/dam/images/travel/fullset/2013/03/28/2d/best-hotel-views_ss_002.rend.hgtvcom.966.725.suffix/1491592688614.jpeg"
                            title="Four Seasons Hotel"
                            loc="Sydney"
                            rating={5.0}
                            price="$65 daily rate"
                        />
                    </Col>
                </Row>
                <Row id="results-row">
                    <Col>
                        <ListingCard
                            img="https://www.elitetraveler.com/wp-content/uploads/2013/06/Royal-Penthouse-Twilight-Terrace-Corinthia-Hotel-London.jpg"
                            title="Corinthia Hotel"
                            loc="England"
                            rating={4.0}
                            price="$44 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://www.elitetraveler.com/wp-content/uploads/2013/06/Jade-Mountain-St-resized.jpg"
                            title="Jade Mountain"
                            loc="St. Lucia"
                            rating={3.0}
                            price="$123 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://www.elitetraveler.com/wp-content/uploads/2013/06/new_RCSINGA_00146.jpg"
                            title="Ritz-Carlton"
                            loc="Singapore"
                            rating={3.5}
                            price="$84 daily rate"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_412,c_fill,g_auto,h_232,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F160506140647-hong-kong-ritz-carlton.jpg"
                            title="InterContinental Hong Kong"
                            loc="Hong Kong"
                            rating={4.5}
                            price="$66 daily rate"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SearchResults;