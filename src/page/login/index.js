import React from "react";
import "../contest/contest.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import LoginWithTwitter from "./withTwitter";
import Header from "../contest/header";
import PostData from "./postdata";

//ServerRoute.login.google
class Login extends React.Component {
  response = (response, type) => {
    console.log(response, type);
    PostData(response, type).then(result => {
      console.log("Post date result", result);
    });
  };

  fbResponse = res => {
    this.response(res, "facebook");
  };
  googleResponse = res => {
    this.response(res, "google");
  };

  render() {
    return (
      <React.Fragment>
        <div className="headerContainer">
          <Header />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30%",
            justifyItems: "center",
            alignItems: "center",

            flexDirection: "column"
          }}
        >
          {" "}
          <GoogleLogin
            clientId="707663383963-dqccqprr7oa69gmlgkja65cbj85beg99.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            cookiePolicy={"single_host_origin"}
            uxMode="popup"
          />
          <br />
          <FacebookLogin
            appId="420890705257600"
            fields="name,email,picture"
            callback={this.fbResponse}
          />
          <br />
          <LoginWithTwitter />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
