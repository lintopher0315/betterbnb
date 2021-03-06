import React, { Component } from 'react'
import axios from 'axios'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Rating from '@material-ui/lab/Rating';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-perfect-scrollbar/dist/css/styles.css';

let randomNames = [
    'Corinthia Hotel',
    'Beautiful Sea Apartment',
    'Hong Kong Peninsula Hotel',
    'Mandarin Oriental',
    'Four Seasons Hotel',
    'Jade Mountain',
    'Ritz-Carlton',
    'InterContinental Hong Kong'
]

let randomImg = [
    "https://cdn.cnn.com/cnnnext/dam/assets/160506135321-hong-kong-hotel-park-lane-super-169.jpg",
    "https://cdn.cnn.com/cnnnext/dam/assets/160506135313-hong-kong-hotel-peninsula-super-169.jpg",
    "https://www.elitetraveler.com/wp-content/uploads/2013/06/night-view4.jpg",
    "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2013/03/28/2d/best-hotel-views_ss_002.rend.hgtvcom.966.725.suffix/1491592688614.jpeg",
    "https://www.elitetraveler.com/wp-content/uploads/2013/06/Royal-Penthouse-Twilight-Terrace-Corinthia-Hotel-London.jpg",
    "https://www.elitetraveler.com/wp-content/uploads/2013/06/Jade-Mountain-St-resized.jpg",
    "https://www.elitetraveler.com/wp-content/uploads/2013/06/new_RCSINGA_00146.jpg",
    "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_412,c_fill,g_auto,h_232,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F160506140647-hong-kong-ritz-carlton.jpg"
]

export class SavedListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "5e793b4e25eca81d644b12a5",
            urls: [],
            data: null,
            map_loc: [10, 10],
            temp_data: [],
            filtered_data: [],
        }
        
    }
      

    componentDidMount() {
        let temp = [];
        for (let i = 0; i < randomNames.length; i++) {
            temp.push(
            <div>
                <div id="saved-listing-btn" onClick={this.changeMap.bind(this)}>
                    <div id="saved-listing-title">
                        {randomNames[i]}
                    </div>
                    <Rating
                        name={'rating'}
                        value={Math.ceil(Math.random()*i/2)}
                        size={'medium'}
                    />
                    <img id="saved-listing-img" alt="" src={randomImg[i]} />
                    <p style={{fontFamily: 'Dosis'}}>
                        ${Math.floor(Math.random()*50+20)} daily rate
                    </p>
                </div>
                <Button id="saved-listing-remove-btn" size="sm" variant="secondary" onClick={() => this.removeList(randomNames[i])}>
                    Remove
                </Button>
                <hr />
            </div>)
        }
        this.setState({temp_data: temp})
        this.setState({filtered_data: temp})

        const requestObj = {
            id: this.state.id,
        }
        
        
        /* we should think about saving all relevant info with a listing */
        /* so we don't need to do multiple requests to get all the data  */
        axios.post('http://localhost:5000/getListings', requestObj)
            .then(response => {
                //res.send(response.data);
                //console.log(response.data[0])

                /* callback function here grabs report data */
                /* will have to patch later for performance */
                this.setState({urls: response.data}, function() {
                    console.log(this.state.urls)
                    for (let i = 0; i < this.state.urls.length; i++) {
                        //console.log("i = ", i);
                        console.log(this.state.urls[i])
                        axios.get('http://localhost:5000/api/report', {headers: {"url": this.state.urls[i]}})
                            .then(response => {
                                this.setState({data: response.data})
                                console.log(response.data)
                            })
                            .catch(err => {
                                console.log(err)
                            }) /* end of get request */

                    }
                    
                }) /* end of callback */

            })
            .catch(err => {
                console.log(err)
                this.setState({redirection: true})
            })
    }

    changeMap() {
        this.setState({map_loc: [-(Math.random() * 100 - 50), -(Math.random() * 100 - 50)]})
    }

    filter() {
        console.log(this.filter_val.state.value)
        this.setState({filtered_data: []})
        let new_filter = []
        for (let i = 0; i < this.state.temp_data.length; i++) {
            if (randomNames[i].toLowerCase().includes(this.filter_val.state.value)) {
                new_filter.push(this.state.temp_data[i])
            }
        }
        this.setState({filtered_data: new_filter})
    }

    removeList = (name) => {
        for (let i = randomNames.length-1; i >= 0; --i) {
            if (randomNames[i].includes(name)) {
                randomNames.splice(i, 1);
                randomImg.splice(i, 1);
            }
        }
        let temp = [];
        for (let i = 0; i < randomNames.length; i++) {
            temp.push(
            <div>
                <div id="saved-listing-btn" onClick={this.changeMap.bind(this)}>
                    <div id="saved-listing-title">
                        {randomNames[i]}
                    </div>
                    <Rating
                        name={'rating'}
                        value={Math.ceil(Math.random()*i/2)}
                        size={'medium'}
                    />
                    <img id="saved-listing-img" alt="" src={randomImg[i]} />
                    <p style={{fontFamily: 'Dosis'}}>
                        ${Math.floor(Math.random()*50+20)} daily rate
                    </p>
                </div>
                <Button id="saved-listing-remove-btn" size="sm" variant="secondary" onClick={() => this.removeList(randomNames[i])}>
                    Remove
                </Button>
                <hr />
            </div>)
        }
        this.setState({temp_data: temp})
        this.setState({filtered_data: temp})
    }

    render() {
        return (
            <div style={{paddingTop: '100px'}}> 
                <Container fluid={true}>
                    <Row>
                        <Col md={4}>
                            <PerfectScrollbar style={{height: '830px'}}>
                                <MuiThemeProvider>
                                    <SearchBar
                                        ref={(value) => this.filter_val = value}
                                        onRequestSearch={this.filter.bind(this)}
                                        onChange={() => {}}
                                        hintText="Filter"
                                        style={{
                                            border: '1px solid #dbdbdb',
                                            maxWidth: '540px',
                                            marginLeft: '20px',
                                            borderRadius: '8px',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </MuiThemeProvider>
                                
                                <div>
                                    {this.state.filtered_data}
                                </div>
                            </PerfectScrollbar>
                        </Col>

                        <Col md={8}>
                            <div>
                                <Map style={{width: '100%', height: '830px', zIndex: 1}} center={this.state.map_loc} zoom={13}>
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={this.state.map_loc}>
                                        <Popup>
                                            Your Location
                                        </Popup>
                                    </Marker>
                                </Map>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
      
        )
    }
}

export default SavedListing

