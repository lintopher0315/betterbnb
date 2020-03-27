import React, { Component } from 'react'
import axios from 'axios'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Container, Row, Col } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Rating from '@material-ui/lab/Rating';
import 'react-perfect-scrollbar/dist/css/styles.css';

export class SavedListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "5e793b4e25eca81d644b12a5",
            urls: [],
            data: null,
            map_loc: [10, 10],
        }
        
    }
      

    componentDidMount() {
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

    render() {

        let temp = [];
        for (let i = 0; i < 20; i++) {
            temp.push(
            <div>
                <div  id="saved-listing-btn" onClick={this.changeMap.bind(this)}>
                    <div id="saved-listing-title">
                        Corinthia Hotel
                    </div>
                    <Rating
                        name={'rating'}
                        value={5}
                        size={'medium'}
                    />
                </div>
                <hr />
            </div>)
        }


        return (
            <div style={{paddingTop: '100px'}}> 
                <Container fluid={true}>
                    <Row>
                        <Col md={4}>
                            <PerfectScrollbar style={{height: '830px'}}>
                                <div>
                                    {temp}
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

