import React, { Component } from 'react'
import SliderComp from './SliderComp.js'
import { Button, Container, Col, Row, Spinner } from 'react-bootstrap';
import "./Preferences.css"

export class Preferences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preferences: [["crime", 50], ["langprevalence", 50],
             ["restaurants", 50], ["lodging", 50], ["population", 50], ["weather", 50]],
        }
        
    }

    componentDidMount() {
        //console.log(this.props.match.params)
    }


    handleChildClick  = (data) => {
        console.log("The data is", data)

        /* updating corresponding part of state*/
        let cpyarr;
        switch (data.pref) {
            
            case 'crime':
                cpyarr = this.state.preferences
                cpyarr[0][1] = data.x
                this.setState({preferences: cpyarr})
                break;
            case 'langprevalence':
                cpyarr = this.state.preferences
                cpyarr[1][1] = data.x
                this.setState({preferences: cpyarr})
                break;
            case 'restaurants':
                cpyarr = this.state.preferences
                cpyarr[2][1] = data.x
                this.setState({preferences: cpyarr})
                break;
            case 'lodging':
                cpyarr = this.state.preferences
                cpyarr[3][1] = data.x
                this.setState({preferences: cpyarr})
                break;
            case 'population':
                cpyarr = this.state.preferences
                cpyarr[4][1] = data.x
                this.setState({preferences: cpyarr})
                break;
            case 'weather':
                cpyarr = this.state.preferences
                cpyarr[5][1] = data.x
                this.setState({preferences: cpyarr})
                break;
              
          }
        
    }

    handleButtonClick = () => {
        console.log(this.state)

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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[0][0]} x={50}/>
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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[1][0]} x={50}/>
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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[2][0]} x={50}/>
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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[3][0]} x={50}/>
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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[4][0]} x={50}/>
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
                            <SliderComp onChildClick={this.handleChildClick} pref={this.state.preferences[5][0]} x={50}/>
                        </Row>
                           
                    </div>
                    <div>
                        <Row>
                            <Button onClick={this.handleButtonClick} className="pref-button">Save My Preferences</Button>
                        </Row>
                        
                    </div>
                </Container>
              
               
                
            </div>
        )
    }
}

export default Preferences
