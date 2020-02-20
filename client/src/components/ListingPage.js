import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container, Col, Row } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

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
                            <div id="listing-desc-title">
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
                        </div>
                    </Col>

                    <Col style={{paddingLeft: '100px'}}>
                        <div id="map-col">
                            <div id="listing-map">
                                <Map style={{width: '100%', height: '500px'}} center={position} zoom={13}>
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
            </Container>
        </div>
    )
}

export default ListingPage;