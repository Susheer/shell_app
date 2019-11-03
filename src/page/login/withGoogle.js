import React, { Component } from "react";
import GoogleLogin from "react-google-login";
class Google extends Component {
  responseGoogle = response => {
    console.log(response);
  };
  render() {
    return (
      <GoogleLogin
        clientId="707663383963-dqccqprr7oa69gmlgkja65cbj85beg99.apps.googleusercontent.com"
        buttonText="Login with google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={"single_host_origin"}
        uxMode="popup"
      />
    );
  }
}

export default Google;
