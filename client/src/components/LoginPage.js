import React from 'react';
import './LoginPage.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { GoogleLogin } from "react-google-login";

export default class LoginPage extends React.Component {
    responseGoogle(googleUser) {
        let id_token = googleUser.getAuthResponse().id_token;
        let googleId = googleUser.getId();
    
        /* var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000');
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          console.log('Signed in as: ' + xhr.responseText);
        };
        xhr.send('idtoken=' + id_token);
        */
        
        console.log({ googleId });
        console.log({ accessToken: id_token });
        //ReactDOM.render(<Logout />, document.getElementById('root'));
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
                    <Col><div className="bg"></div></Col>
                    <Col>
                    <div className="right">
                    <h1>BetterBNB</h1>
                    <h2>Welcome to BetterBNB</h2>

                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>

                    <h3>Forgot password?</h3>
                    <div class="button"><Button as="input" type="submit" value="Sign in" className="button"/></div>
                    <br/>
                    <h4>or</h4>
                    <br/>                    
                    
                    <div class="button"><GoogleLogin 
                            clientId="632393601114-gu49rgn5ic3e52odjg6u7cg9111ibdbv.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            //theme='dark'
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /></div>
                    <h5>New to BetterBNB? Create Account</h5>
                    </div>
                    </Col>
                </Row>
        );
    }
}