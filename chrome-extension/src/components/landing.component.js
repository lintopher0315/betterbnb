import React, { Component } from 'react'
import { Spinner, Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default class Landing extends Component {

    constructor(props) {
        super(props)
        window.chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let currentUrl = tabs[0].url;
        if (currentUrl.includes("airbnb") && currentUrl.includes("room")) {
            this.setState({
                currentMsg: "Gathering information (please wait)..."
            })

            // make API call 
            axios.get('http://localhost:5000/api/report', {headers: {"url": currentUrl}})
            .then(response => {
                //res.send(response.data);
                console.log(response.data)
                this.setState({dataObj: response.data})
            })
            .catch(err => {
                console.log(err)
                this.setState({currentMsg: "Error gathering information..."})
            })
        }
    });
        
        this.state = {
            currentMsg: "Visit an Airbnb listing to get started...",
            gathering: false,
            dataObj: undefined,
            url: undefined
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        


        
        window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "BETTERBNB_PLUGIN_EVALUATED_CONFIG") {
                let currentUrl = message.configData
                if (currentUrl.includes("rooms")) {
                    this.setState({
                        currentMsg: "Gathering information (please wait)..."
                    })

                    // make API call 
                    axios.get('http://localhost:5000/api/report', {headers: {"url": currentUrl}})
                    .then(response => {
                        //res.send(response.data);
                        console.log(response.data)
                        this.setState({dataObj: response.data})
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({currentMsg: "Error gathering information..."})
                    })

                }
            }
          })

        this.enteredUrl = (newUrl) => this.setState({
            url: newUrl
        })

    }

    componentWillMount() {
        //                configData: message.configData
       /* 
        */

    }

    makeAPICall() {
        
    }

    getRestaurant(someint) {
        let restaurants = Object.keys(this.state.dataObj.restraunt_data)
        return restaurants[someint]
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            url: value
        });
    }

    handleSubmit(event) {
        let currentUrl = this.state.url
        let redirectUrl = 'http://localhost:3000/details/' + currentUrl
        window.chrome.tabs.create({'url': redirectUrl})
        
    }

    
    
    render() {

        if (this.state.dataObj !== undefined) {
            return(
                <div className='container' style={{paddingTop: "2%"}}>
                    <div className='text-center'>
                        <h5>Information:</h5>
                        <hr />
                        <h6>Local Area Pop: {this.state.dataObj.population_size}</h6>
                        <hr />
                        <h6>City Crime Stats:</h6>
                        <p>
                        Robbery: {this.state.dataObj.crime_data.robbery}<br /> 
                        Vehicle Theft: {this.state.dataObj["motor-vehicle-theft"]}<br /> 
                        Larceny: {this.state.dataObj.crime_data.larceny}<br />
                        </p>
                        <hr />
                        <h6>Nearby Restaurants:</h6>
                        <p>
                            {this.getRestaurant(1)} <br />
                            {this.getRestaurant(2)} <br />
                            {this.getRestaurant(3)} <br />
                        </p>


                    </div>
                </div>
            )
        }
        else if (!this.state.gathering) {
            return(
                <div className='container' style={{paddingTop: "10%"}}>
                    <div className='text-center'>
                        <Spinner animation="grow" variant="dark" />
                        <p>{this.state.currentMsg}</p> 
                        <hr />
                        <h3>OR</h3>
                        <Form>
                            <Form.Group controlId="formAirbnbUrl">
                                <Form.Control type="text" placeholder="Airbnb url" value={this.state.url} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant='outline-dark' onClick={this.handleSubmit}>Enter</Button>
                        </Form>
                        
                    </div>
                </div>
            )
        }
        else if (this.state.gathering) {
            return(
                <div className='container' style={{paddingTop: "35%"}}>
                    <div className='text-center'>
                        <Spinner animation="grow" variant="dark" />
                        <p>{this.state.currentMsg}</p> 
                    </div>
                </div>
            )
        }
    }
}
