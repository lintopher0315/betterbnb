import React, { Component } from 'react'
import { Spinner, Form } from 'react-bootstrap'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        // do some stuff here related to the settings
        this.state = {
            currentSelection: 0, 
            crime: false, 
            population: false, 
            restaurants: false, 
            lang: false
        }

        this.crimeHandle = () => this.setState({
            crime: !this.state.crime,
            currentSelection: !this.state.crime ? this.state.currentSelection+1 : this.state.currentSelection-1
        })

        this.popHandle = () => this.setState({
            population: !this.state.population,
            currentSelection: !this.state.population ? this.state.currentSelection+1 : this.state.currentSelection-1
        })

        this.restaurantHandle = () => this.setState({
            restaurants: !this.state.restaurants,
            currentSelection: !this.state.restaurants ? this.state.currentSelection+1 : this.state.currentSelection-1
        })

        this.langHandle = () => this.setState({
            lang: !this.state.lang,
            currentSelection: !this.state.lang ? this.state.currentSelection+1 : this.state.currentSelection-1
        })
    }

    
    render() {
        console.log(this.state.currentSelection)
        console.log(this.state.crime)
        var disabled = disabled
        return(
            <div className='container' style={{paddingTop: "2%"}}>
                <div className='text-center'>
                    <h1>Settings</h1>
                    <p>Select your desired options (3 allowed)</p>
                    <hr />
                    <p align="justify">
                        <Form.Check 
                            type="switch"
                            id="crime"
                            label="Crime"
                            onChange={() => this.crimeHandle()}
                        /> <br />
                        <Form.Check 
                            type="switch"
                            id="population"
                            label="Population"
                            onChange={() => this.popHandle()}
                        /> <br /> 
                        <Form.Check 
                            type="switch"
                            id="restaurants"
                            label="Restaurants"
                            onChange={() => this.restaurantHandle()}
                        /> <br />
                        <Form.Check 
                            type="switch"
                            id="lang"
                            label="Language Prevalence"
                            onChange={() => this.langHandle()}
                        />
                    </p>
                    <p><b>Coming Soon:</b> Sign-in with Betterbnb</p>
                </div>
            </div>
        )
    }
}
