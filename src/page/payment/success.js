import React from "react";
import "../contest/contest.css";
import ServerRoutes from "../../config/routes.json";

/* import MatchHeader from "./match-header"; */

import { InfoBar } from "../contest/header-component";
import Header from "../contest/header";

class PSuccess extends React.Component {
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
            marginTop: "30%"
          }}
        >
          {" "}
          <h3 style={this.props.style}>{this.props.message}</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default PSuccess;
