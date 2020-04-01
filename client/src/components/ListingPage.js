import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Slider from "react-slick";
import { Button, Container, Col, Row, Spinner } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line, Scatter } from 'react-chartjs-2';

const CONSTANT_GOOGLE_API_KEY = "AIzaSyACEj7IvA9oyKaApQikJKvSVm1B_nmFSUw"

const carousel_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
}

export default class ListingPage extends React.Component {
    
    constructor(props) {
        super(props)

        this.onSaveListing = this.onSaveListing.bind(this);
        
        /* id is a placeholder*/
        this.state =  {
            id: "5e793b4e25eca81d644b12a5",
            url: "",
            data: undefined,
            redirection: false
        }
    }

    onSaveListing(e) {
        e.preventDefault()
        
        const requestObj = {
            id: this.state.id,
            url:  this.state.url
        }

        console.log(requestObj)
        axios.post("http://localhost:5000/addListing", requestObj)
            .then(() => console.log("url is", this.state.url))
            .catch(err => {
                console.log(err);
            })
    }

    onSaveListing(e) {
        e.preventDefault()
        
        const requestObj = {
            id: this.state.id,
            url:  this.state.url
        }

        console.log(requestObj)
        axios.post("http://localhost:5000/removeListing", requestObj)
            .then(() => console.log("url is", this.state.url))
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        let currentUrl = window.location.href.toString() 
        let currentUrlSplit = currentUrl.split("url=")

        /* If not logged in, redirect */
        if (currentUrlSplit.length != 2 || currentUrlSplit[1] === "") {
            this.setState({
                redirection: true
            })
        }
        else {
            currentUrl = currentUrlSplit[1]
            console.log("the current url is", currentUrl)
            this.setState({url: currentUrl})
        }

        
        axios.get('http://localhost:5000/api/report', {headers: {"url": currentUrl}})
                    .then(response => {
                        //res.send(response.data);
                        console.log(response.data)
                        this.setState({data: response.data})
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({redirection: true})
                    })
        
    }


    render() {
        if (this.state.redirection) {
            console.log("true!")
            if (window.location.search.split('=')[1] === null || window.location.search.split('=')[1] === "undefined") {
                return(
                    <Redirect to={'/?q=undefined'} />
                )
            }
            else {
                return(
                    <Redirect to={'/userhome?q=' + window.location.search.split('=')[1]} />
                )
            }
        }
        else if (this.state.data === undefined) {
            return (
                <div className='text-center' style={{color: "black", paddingTop: "10%"}}>
                    <h3>Generating report...</h3>
                    <Spinner animation="grow" />
                </div>
            )   
        }
        var settings = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '400px',
            autoplay: true,
            pauseOnHover: true,
        }

        const position = [this.state.data.lat, this.state.data.longt]

        var crimeDataYearly = {
            labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
            datasets: [{
                data: [5, 8, 4, 10, 13, 8, 6, 7, 10, 8, 8, 6],
                label: "Crime Frequency Dataset",
                borderColor: "#f54293",
                fill: false,
            }]
        }

        var crimeDataMonthly = {
            datasets: [{
                data: [{
                    x: 1,
                    y: 2
                }, {
                    x: 2,
                    y: 5
                }, {
                    x: 5,
                    y: 4
                }, {
                    x: 7,
                    y: 3
                }, {
                    x: 10,
                    y: 6
                }, {
                    x: 13,
                    y: 5
                }],
                label: "Crime Frequency Dataset",
                borderColor: "#b82e6c",
                fill: false,
                showLine: true,
            }]
        }

        let lodgings = this.state.data.lodging_data.results.map((result, i) => {
            if (typeof(result.photos) !== "undefined") {
                return (
                    <div style={{position: "relative"}} key={i}>
                        <img id="lodging-img" alt={result.name} src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${result.photos[0].photo_reference}&sensor=false&maxheight=400&maxwidth=400&key=${CONSTANT_GOOGLE_API_KEY}`} />
                        <div id="lodging-info">
                            {
                                result.name.length>25 ? result.name.substring(0, 25)+"..." : result.name
                            }
                            <div style={{top: '50px', fontSize: "16px"}}>
                                {result.vicinity}
                            </div>
                            <div style={{position: "relative", top: "10px", fontSize: '18px'}}>
                                <Rating
                                    name={'rating'}
                                    value={result.rating}
                                    size={'small'}
                                />
                                ({result.user_ratings_total})
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div style={{position: "relative"}} key={i}>
                        <img id="lodging-img" alt={result.name} src="https://i.picsum.photos/id/237/400/400.jpg" />
                    </div>
                )
            }
        })

        return (
            <div>
                <div id="carousel-container">
                    <Slider {...settings}>
                        <div>
                            <img src="https://picsum.photos/id/1018/1000/600/" alt="" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/id/1015/1000/600/" alt="" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/id/1019/1000/600/" alt="" />
                        </div>
                    </Slider>
                </div>
                <Container fluid={true}>
                    <Row>
                        <Col style={{paddingRight: '100px'}}>
                            <div id="desc-col">
                                <div id="listing-page-title">
                                    Four Seasons Hotel
                                </div>
                                <div id="listing-page-loc">
                                    Sydney
                                </div>
                                <Rating
                                    id="listing-page-star"
                                    name={'rating'}
                                    value={5}
                                    size={'medium'}
                                />
                                <Button className="listing-page-btn" variant="outline-success" size="sm">
                                    <a className="listing-page-link" href='../res/sample_pdf.pdf' download>Download PDF</a>
                                </Button>
                                <Button onClick={this.onSaveListing} className="listing-page-btn" variant="outline-success" size="sm">
                                    {/* <a className="listing-page-link">{this.state.id}</a> */}
                                    Save Listing  
                                </Button>
                                <Button onClick={this.onRemoveListing} className="listing-page-btn" variant="outline-success" size="sm">
                                    {/* <a className="listing-page-link">{this.state.id}</a> */}
                                    Remove Listing
                                </Button>
                                <hr />
                                <div id="listing-sub-title">
                                    Description
                                </div>
                                <div id="listing-desc-text">
                                    Location doesn’t get any better than this: 
                                    Iconic Sydney Harbor sits at the doorstep of our 
                                    award-winning Central Business District Hotel, with historic 
                                    The Rocks and Circular Quay right next door. Head out to explore the nearby shopping, 
                                    outdoor adventure and vibrant social scene that surround us, 
                                    then meet back at Mode Kitchen &amp; Bar for fresh, local cuisine and drinks at Grain. 
                                    In Sydney, work and play are never too far apart. And that’s just the way we like it.
                                </div>
                                <hr />
                            </div>
                        </Col>

                        <Col style={{paddingLeft: '100px'}}>
                            <div id="map-col">
                                <div id="listing-map">
                                    <Map style={{width: '100%', height: '500px', zIndex: 1}} center={position} zoom={13}>
                                        <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={position}>
                                            <Popup>
                                                Your Location
                                            </Popup>
                                        </Marker>
                                    </Map>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="area-col">
                                <div id="listing-sub-title">
                                    About the Area
                                </div>
                                
                            </div>
                        </Col>
                        <Col>
                        
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="area-col">
                                <div id="listing-sub-title-second">
                                    Weather
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div id="area-col-next">
                                <div id="listing-sub-title-second">
                                    Population
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="area-col">
                                <img alt="clear_sun" src={require("../res/clear_sun.png")} />
                                <div id="listing-desc-text">
                                    Local weather indicates signs of {this.state.data.weather_data.main_weather_description}.
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <Container style={{paddingTop: "50px"}}>
                                <Row>
                                    <Col>
                                        <div style={{float: 'right', paddingRight: '200px'}}>
                                            <img alt="population" src={require("../res/population.png")} />
                                        </div>
                                    </Col>
                                    
                                    <Col>
                                        <div style={{float: 'left', paddingLeft: '0px'}}>
                                            <img alt="pop_density" src={require("../res/pop_density.png")} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div id="listing-desc-text" style={{float: 'right', paddingRight: '230px'}}>
                                            {this.state.data.population_size} Total
                                        </div>
                                    </Col>

                                    <Col>
                                        <div id="listing-desc-text" style={{float: 'left', paddingLeft: '5px'}}>
                                            {this.state.data.population_information.population_density_per_sq_mi} per Square Mile
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="area-col">
                                <div id="listing-sub-title-second">
                                    Nearby Lodging
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="lodging-container">
                                <Slider {...carousel_settings}>
                                    {lodgings}
                                </Slider>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="area-col">
                                <div id="listing-sub-title-second">
                                    Crime
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div id="chart-container-left">
                                <Line
                                    data={crimeDataYearly}
                                    options={{
                                        maintainAspectRatio: false,
                                        title: {
                                            display: true,
                                            text: 'Reported Crime Incidents Over Past Year',
                                            fontFamily: 'Dosis',
                                        },
                                        scales: {
                                            xAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Month',
                                                    fontFamily: 'Dosis',
                                                }
                                            }],
                                            yAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Number of Reports',
                                                    fontFamily: 'Dosis',
                                                }
                                            }]
                                        },
                                    }}
                                />
                            </div>
                        </Col>

                        <Col style={{paddingLeft: '100px'}}>
                            <div id="chart-container-right">
                                <Scatter
                                    type="scatter"
                                    data={crimeDataMonthly}
                                    options={{
                                        maintainAspectRatio: false,
                                        title: {
                                            display: true,
                                            text: 'Reported Crime Incidents Over Past Month',
                                            fontFamily: 'Dosis',
                                        },
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    max: 30,
                                                    min: 0,
                                                    stepSize: 1
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Day of Month',
                                                    fontFamily: 'Dosis',
                                                }
                                            }],
                                            yAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Number of Reports',
                                                    fontFamily: 'Dosis',
                                                }
                                            }]
                                        },
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}