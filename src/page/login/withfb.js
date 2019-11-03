import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);
  };
  render() {
    return (
      <FacebookLogin
        appId="420890705257600"
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    );
  }
}

export default Facebook;
