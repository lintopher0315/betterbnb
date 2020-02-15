import React from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container, Col, Row } from 'react-bootstrap';

import ListingCard from './ListingCard.js'

function SearchResults() {
    return (
        <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <SearchBar
                    onChange={() => console.log("changed")}
                    onRequestSearch={() => console.log("searched")}
                    hintText={"Search a location"}
                    style={{
                        marginLeft: 100,
                        maxWidth: 850,
                        borderRadius: 10,
                        marginTop: 80
                    }}
                />
            </MuiThemeProvider>
            <Container id="results-container" fluid={true}>
                <Row id="results-row">
                    <Col>
                        <ListingCard
                            img="https://atlantis.nyc3.digitaloceanspaces.com/styled/72025f140f22a3eb32950bbb9d76e68d"
                            title="Beach"
                            text="This is a beach, which has sand and waves. Despite what people might think, beaches are NOT fun."
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://news.uns.purdue.edu/images/+2007/jischkedrive-signs.jpg"
                            title="205 South Martin Jischke Drive"
                            text="B^)"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="Big"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="Randy"
                        />
                    </Col>
                </Row>
                <Row id="results-row">
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="Is"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="Watching"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="You"
                        />
                    </Col>
                    <Col>
                        <ListingCard
                            img="https://static.hltv.org/images/playerprofile/thumb/11227/800.jpeg?v=3"
                            title="Randy"
                            text="Sleep"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SearchResults;