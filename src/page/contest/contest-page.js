import React from "react";
import "./contest.css";
/* import MatchHeader from "./match-header"; */
import ContestSortingMenu from "./sortingBody/contestHeader";
import { InfoBar } from "./header-component";
import Header from "./header";

import flag1 from "../../dst/img/flags/BBT-CR2@2x.png";
import flag2 from "../../dst/img/flags/BIH-CR1@2x.png";
import Match from "../../reusable-components/prizePool";

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

        <div>
          <Match
            key={"1234"}
            matchId={"87687"}
            matchStatus={"Entry"}
            matchStatusColor={"green"}
            flagAColor={"pink"}
            flagBColor={"blue"}
            title={"Prize Pool"}
            teamA={"tes"}
            teamB={"tes"}
            flagA={flag1}
            flagB={flag2}
            time={"ik i i"}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Contest;
