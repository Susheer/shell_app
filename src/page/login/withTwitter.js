import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
class Twitter extends Component {
  onFailed = response => {
    console.log(response);
  };
  onSuccess = response => {
    console.log(response);
  };
  render() {
    return (
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={this.onFailed}
        onSuccess={this.onSuccess}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
      />
    );
  }
}

export default Twitter;
