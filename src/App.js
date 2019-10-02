import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Home } from "./page/home";
import Contest from "./page/contest/contest-page";
class App extends React.Component {
  render() {
    return (
      <div className="App  app-container">
        <Route path="/" exact={true} render={props => <Home {...props} />} />
        <Route
          path="/contest"
          exact={true}
          render={props => <Contest {...props} />}
        />
      </div>
    );
  }
}
export default App;
