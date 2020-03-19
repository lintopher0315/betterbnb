import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Container, Col, Row } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line, Scatter } from 'react-chartjs-2';

function ListingPage() {

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

    const position = [-33.861691, 151.207687]

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
                            <Button id="listing-page-download-btn" variant="outline-success" size="sm">
                                <a id="listing-page-download" href='../res/sample_pdf.pdf' download>Download PDF</a>
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
                                then meet back at Mode Kitchen & Bar for fresh, local cuisine and drinks at Grain. 
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

export default ListingPage;