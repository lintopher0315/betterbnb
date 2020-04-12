import React, { Component } from 'react'
import SliderComp from './SliderComp.js'
import Slider from 'react-input-slider'
import { Button, Container, Col, Row, Spinner } from 'react-bootstrap';
import "./Preferences.css"
import axios from 'axios'

export class Preferences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "default",
            preferences: [["crime", 50], ["langprevalence", 50],
             ["restaurants", 50], ["lodging", 50], ["population", 50], ["weather", 50]],
            loaded: false,
            languages: ["english"],
            spanishvalue: "",
            frenchvalue: "",
            portvalue: "",
            hindivalue: "",
            showConfirm: false
            
        }
        //this.handleLangChange = this.handleLangChange.bind(this);
        
    }

    // handleLangChange(event) {
        
    //     const target = event.target;
    //     const value = target.name;
    //     const name = target.name;
    //     console.log(name)
    //     this.setState({
    //       [name]: value    });
    // }

    componentDidMount() {
        if (window.location.search) {
            let userid = window.location.search.split('=')[1]
            this.setState({id: userid})

            axios.post('http://localhost:5000/getprefs', {id: userid})
                    .then(response => {
                        console.log(response.data)
                        if(response.data[2].length > 0)  {
                            this.setState({preferences: response.data})
                            this.setState({loaded: true})
                        }
                        
                        console.log("Updated state")
                    })
                    .catch(err => {
                        console.log(err)
                    })
           

        }
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

    /* 
    axios.post("http://localhost:5000/addListing", requestObj)
            .then(() => console.log("url is", this.state.url))
            .catch(err => {
                console.log(err);
            })
    
    
    */
    handleButtonClick = () => {
        const confirm = this.state.showConfirm
        this.setState({showConfirm: true})
        console.log("State is ", this.state.preferences)

        let requestObj = {
            id: this.state.id,
            prefs: this.state.preferences
        }
        axios.post("http://localhost:5000/setprefs", requestObj)
            .then(() => console.log("Set preferences"))
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div>
                <h1 id="title">Preferences</h1>
                <hr id="line"></hr>
                <Container>
                    <div className="preferencesBlock">
                        <Row>
                            <h2 className="subtitle">Importance of Data</h2>
                        </Row>
                    </div>
                    <div className="preferencesBlock">
                        
                        <Row>
                            <h3>Crime Data</h3>
                        </Row>

                        <Row>
                            <p className="infopara">We use data on the prevelance of crime in your booking's area, as reported by the FBI.</p>
                        
                        </Row>
                        
                        <Row>
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[0][0]} x={this.state.preferences[0][1]}/>
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
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[1][0]} x={this.state.preferences[1][1]}/>
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
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[2][0]} x={this.state.preferences[2][1]}/>
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
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[3][0]} x={this.state.preferences[3][1]}/>
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
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[4][0]} x={this.state.preferences[4][1]}/>
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
                            <SliderComp key={this.state.loaded} onChildClick={this.handleChildClick} pref={this.state.preferences[5][0]} x={this.state.preferences[5][1]}/>
                        </Row>
                           
                    </div>
                    <hr></hr>
                    <div>
                        <Row>
                            <h2 className="subtitle">Get Language Prevelance Data</h2>
                            
                        </Row>

                        <Row>
                            <p className="infopara">Choose from Spanish, French, Portuguese, and Hindi</p>
                            
                        </Row>

                        <Row>
                        <form className="langboxes">
                                <label className="checkboxcontainer">
                                    <input className="mycheckbox" type="checkbox" checked={this.state.spanishvalue} onChange={this.handleLangChange}/>
                                    <span className="checkboxtext"> Spanish</span>
                                </label>
                                <label className="checkboxcontainer">
                                    <input className="checkbox" type="checkbox" checked={this.state.frenchvalue}/>
                                    <span className="checkboxtext"> French</span>
                                </label>
                                <label className="checkboxcontainer">
                                    <input className="checkbox" type="checkbox" checked={this.state.portvalue}/>
                                    <span className="checkboxtext"> Portuguese</span>
                                </label>
                                <label className="checkboxcontainer">
                                    <input className="checkbox" type="checkbox" checked={this.state.hindivalue}/>
                                    <span className="checkboxtext"> Hindi</span>
                                </label>
                            </form>
                        </Row>
                          
                        
                    </div>
                    <div>
                        <Row>
                            <Button onClick={this.handleButtonClick} className="pref-button">Update preferences</Button>
                            {this.state.showConfirm ? <p>Preferences saved!</p> : <p></p>}

                        </Row>

                       
                        
                    </div>
                </Container>
              
               
                
            </div>
        )
    }
}

export default Preferences
