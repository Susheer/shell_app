import React from "react";
import "./contest.css";
/* import MatchHeader from "./match-header"; */
import ContestSortingMenu from "./sortingBody/contestHeader";
import { InfoBar } from "./header-component";
import Header from "./header";

class Contest extends React.Component {
  state = {};
  render() {
    let data = {};
    if (this.props.location.state) {
      data = this.props.location.state;
    }

    return (
      <React.Fragment>
        <div className="headerContainer">
          <Header />
          {/* ---------*/}
          <InfoBar
            center={data.time}
            left={data.teamA + " Vs " + data.teamB}
            icon="access_time"
          />
        </div>
        {/*   <MatchHeader /> */}

        <ContestSortingMenu />
      </React.Fragment>
    );
  }
}

export default Contest;
