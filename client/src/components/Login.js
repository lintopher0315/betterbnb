import React from "react";
import { GoogleLogin } from "react-google-login";

import Logout from "./Logout.js";
import ReactDOM from 'react-dom';

class Login extends React.Component {
  responseGoogle(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    let googleId = googleUser.getId();
    console.log({ googleId });
    console.log({ accessToken: id_token });
    ReactDOM.render(<Logout />, document.getElementById('root'));
  }

  render() {

    return (
      <GoogleLogin 
        clientId="632393601114-gu49rgn5ic3e52odjg6u7cg9111ibdbv.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        //theme='dark'
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }

  

  
}

export default Login;