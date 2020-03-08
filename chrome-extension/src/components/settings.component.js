import React, { Component } from 'react'
import { Spinner, Form } from 'react-bootstrap'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        // do some stuff here related to the settings
        this.state = {
            currentSelection: 0 
        }
    }


    
    render() {
        return(
            <div className='container' style={{paddingTop: "2%"}}>
                <div className='text-center'>
                    <h1>Settings</h1>
                    <p>Check your desired options (3 allowed)</p>
                    <hr />
                    <p align="justify">
                        <Form.Check 
                            type="switch"
                            id="crime"
                            label="Crime"
                        /> <br />
                        <Form.Check 
                            type="switch"
                            id="population"
                            label="Population"
                        /> <br /> 
                        <Form.Check 
                            type="switch"
                            id="restaurants"
                            label="Restaurants"
                        />
                    </p>
                    <br />
                    <p><b>Coming Soon:</b> Sign-in with BetterBNB</p>
                </div>
            </div>
        )
    }
}