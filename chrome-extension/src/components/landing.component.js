import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'

export default class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentMsg: "Visit an Airbnb listing to get started...",
            gathering: false,
            dataObj: undefined
        }
        this.getRestaurant=this.getRestaurant.bind(this)
        
        
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
                    })

                }
            }
          })

    } 


    componentDidMount() {
        //                configData: message.configData
       /* 
        */
    }

    getRestaurant(someint) {
        let restaurants = Object.keys(this.state.dataObj.restraunt_data)
        return restaurants[someint]
    }

    
    
    render() {

        if (this.state.dataObj !== undefined) {
            return(
                <div className='container' style={{paddingTop: "2%"}}>
                    <div className='text-center'>
                        <h5>Information:</h5>
                        <hr />
                        <h6>Local Area Pop: {this.state.dataObj.population_data}</h6>
                        <hr />
                        <h6>City Crime Stats:</h6>
                        <p>
                        Robbery: {this.state.dataObj.crime_data.robbery}<br /> 
                        Burgarly: {this.state.dataObj.crime_data.burglary}<br /> 
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
                <div className='container' style={{paddingTop: "35%"}}>
                    <div className='text-center'>
                        <Spinner animation="grow" variant="dark" />
                        <p>{this.state.currentMsg}</p> 
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