import React, { Component } from 'react'
import SliderComp from './SliderComp.js'
import { Button, Container, Col, Row, Spinner } from 'react-bootstrap';
import "./Preferences.css"

export class Preferences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        
    }
    render() {
        return (
            <div>
                <h1 id="title">Preferences</h1>
                <hr id="line"></hr>
                <Container>
                    
                    <div className="preferencesBlock">
                        <Row>
                            <h3>Crime Data</h3>
                        </Row>

                        <Row>
                            <p className="infopara">We use data on the prevelance of crime in your booking's area, as reported by the FBI.</p>
                        
                        </Row>
                        
                        <Row>
                            <SliderComp x={50}/>

                        </Row>
                        
                    </div>

                    <div className="preferencesBlock"> 
                        <Row>
                            <h3>Language Prevalence</h3>
                        </Row>

                        <Row>
                            <p className="infopara">Language prevelance data can be useful if you have
                            any non-english speakers traveling with you. The data is not available for every part of the U.S.
                            but is for any major city. Our data is from the Census Bureau. 
                            </p>
                        </Row>

                        <Row>
                            <SliderComp x={50}/>
                        </Row>
                           
                    </div>

                    <div className="preferencesBlock"> 
                        <Row>
                            <h3>Nearby Restaurants</h3>
                        </Row>

                        <Row>
                            <p className="infopara">If you want to know about the food around you, we'll suggest local restaurants that are highly rated.
                            </p>
                        </Row>

                        <Row>
                            <SliderComp x={50}/>
                        </Row>
                           
                    </div>

                    <div className="preferencesBlock"> 
                        <Row>
                            <h3>Nearby Lodging Alternatives</h3>
                        </Row>

                        <Row>
                            <p className="infopara">
                                We can help you compare some of the other loding alternatives to the listing you're looking at.
                            </p>
                        </Row>

                        <Row>
                            <SliderComp x={50}/>
                        </Row>
                           
                    </div>

                    <div className="preferencesBlock"> 
                        <Row>
                            <h3>Population Data</h3>
                        </Row>

                        <Row>
                            <p className="infopara">
                                Want to be around people? Want to get away from them? Use our population data to see if 
                                where you're going is the right fit for you.
                            </p>
                        </Row>

                        <Row>
                            <SliderComp x={50}/>
                        </Row>
                           
                    </div>

                    <div className="preferencesBlock"> 
                        <Row>
                            <h3>Weather Data</h3>
                        </Row>

                        <Row>
                            <p className="infopara">
                                See the upcoming forecast of the area you're staying at with weather data we pull for you. 
                                And, of course, plan your trip accordingly.
                            </p>
                        </Row>

                        <Row>
                            <SliderComp x={50}/>
                        </Row>
                           
                    </div>
                </Container>
              
               
                
            </div>
        )
    }
}

export default Preferences
