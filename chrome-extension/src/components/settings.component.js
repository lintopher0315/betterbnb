import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GoogleLogin } from "react-google-login";
import googleButton from "../images/btn_google_signin_light_normal_web.png";



export default class Settings extends Component {
    constructor(props) {
        super(props)

        // do some stuff here related to the settings
        this.state = {
            loggedIn: false 
        }
    }

    // TODO: 
    // Create new API endpoint to handle Google OAuth from Chrome extension
    // Create handler that calls Chrome API opening new tab

    render() {


        if (!this.state.loggedIn) {
        return(
            <div className='container' style={{paddingTop: "2%"}}>
                <div className='text-center'>
                    <h1>Settings</h1>
                    <p>Login with your Betterbnb account for more options</p>
                    <hr />
                    <Form>
                        <Form.Group controlId="formAirbnbUrl">
                            <Form.Control type="text" placeholder="username" /> <br />
                            <Form.Control type="password" placeholder="password" />
                        </Form.Group>
                        <Button variant='outline-dark' onClick={this.handleSubmit}>Login</Button>
                    </Form> <br />
                    <a href="http://localhost:5000/login/google"><img src={googleButton}></img></a>                    
                </div>
            </div>
            )
        }
    }
}   
