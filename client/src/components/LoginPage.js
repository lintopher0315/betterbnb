import React from 'react';
import './LoginPage.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";

export default class LoginPage extends React.Component {
    
    responseGoogle(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        let googleId = googleUser.getId();
        
        console.log({ googleId });
        console.log({ accessToken: id_token });
        window.location.href = `/userhome/?q=${id_token}`;
      }

    responseFacebook(response) {
        console.log(response);
        window.FB.logout((response) => {
            console.log("Logged Out.")
            console.log(response);
        });
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
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>   
                    </Form>

                    <p id="forgot-pass">Forgot password?</p>
                    <div class="button">
                        <Button as="input" type="submit" value="Sign in" className="button"/>
                    </div>
                    <br/>
                    <h4>or</h4>
                    <br/>                    
                
                    <div class="button">
                        <GoogleLogin 
                            clientId="632393601114-gu49rgn5ic3e52odjg6u7cg9111ibdbv.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            //theme='dark'
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <h5>New to BetterBNB? <Link id="create-account" to ='/registration'>Create Account</Link></h5>
                    </div>
                </Col>
            </Row>
        );
    }
}