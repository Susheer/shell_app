import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Home } from "./page/home";
import Contest from "./page/contest/contest-page";
import PSuccess from "./page/payment/success";
class App extends React.Component {
  render() {
    /*  console.log(new Date().toUTCString()); */
    return (
      <div className="App  app-container">
        <Route path="/" exact={true} render={(props) => <Home {...props} />} />
        <Route
          path="/contest"
          exact={true}
          render={(props) => <Contest {...props} />}
        />
        <Route
          path="/payment_success"
          exact={true}
          render={(props) => (
            <PSuccess style={{ color: "black" }} message={"Payment Success"} />
          )}
        />
        <Route
          path="/PaymentFailed"
          exact={true}
          render={(props) => (
            <PSuccess style={{ color: "red" }} message={"Payment Failed"} />
          )}
        />
        <Route
          path="/payment_verification_failed"
          exact={true}
          render={(props) => (
            <PSuccess
              style={{ color: "red" }}
              message={" payement verification failed"}
            />
          )}
        />
        <Route
          path="/server_problem"
          exact={true}
          render={(props) => (
            <PSuccess
              style={{ color: "black" }}
              message={"Opps somthing went wrong!!"}
            />
          )}
        />
      </div>
    );
  }
}
export default App;
