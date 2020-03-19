import React from 'react';
import './LoginPage.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import axios from 'axios';
import googleButton from "../images/btn_google_signin_light_normal_web.png";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        axios
            .post('http://localhost:5000/login', {username: this.state.email, password: this.state.password})
            .then(() => console.log('Attempting to Login'))
            .catch(err => {
                console.error(err);
        });   
        //window.location.href = `/userhome/?q=`;
        this.setState({
            email: '',
            password: ''
        });
    }
    
    responseGoogle(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        let googleId = googleUser.getId();
        
        console.log({ googleId });
        console.log({ accessToken: id_token });
        window.location.href = `/userhome/?q=${id_token}`;
      }

    render() {
        return(
            <Row>
                <Col>
                    <div className="bg"></div>
                </Col>
                <Col>
                    <div className="right">
                        <h1>BetterBNB</h1>
                        <h2>Welcome to BetterBNB</h2>

                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
                        </Form.Group>   
                    </Form>

                    <p id="forgot-pass">Forgot password?</p>
                    <div class="button">
                        <Button type="submit" onClick={this.handleSubmit}>Sign in</Button>
                    </div>
                
                    <br/>
                    <h4>or</h4>
                    <br/>                    
                    
                    <div class="button">
                        <a href="http://localhost:5000/login/google"><img src={googleButton}></img></a>                    
                    </div>
                    <h5>New to BetterBNB? <Link id="create-account" to ='/registration'>Create Account</Link></h5>
                    </div>
                </Col>
            </Row>
        );
    }
}