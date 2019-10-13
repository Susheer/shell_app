import React from "react";
import "./contest.css";
import ServerRoutes from "../../config/routes.json";
import axios from "axios";
/* import MatchHeader from "./match-header"; */
import ContestSortingMenu from "./sortingBody/contestHeader";
import { InfoBar } from "./header-component";
import Header from "./header";

import Match from "../../reusable-components/prizePool";

class Contest extends React.Component {
  state = { contests: [], details: "loading..." };

  componentDidMount() {
    let data = this.props.location.state;
    axios
      .post(ServerRoutes.contestPg.listByMatch, { match: data._id })
      .then(response => {
        if (response.data) {
          if (response.data.success) {
            console.log("ContestPg server res-", response.data);
            if (response.data.data.length) {
              this.setState({ contests: response.data.data });
            } else {
              this.setState({ details: "No Contests Found" });
            }
          } else {
            console.log("ContestPg server res-", response.data);
            this.setState({ details: response.data.details });
          }
        }
      })
      .catch(err => {
        console.log("ContestPg server error-", err);
      });
  }

  render() {
    let data = {};
    if (this.props.location.state) {
      data = this.props.location.state;
    }

    const { contests, details } = this.state;
    let style = contests.length
      ? {}
      : {
          display: "flex",

          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        };
    return (
      <React.Fragment>
        <div className="headerContainer">
          <Header />
          {/* ---------*/}
          <InfoBar
            center={data.startDate}
            left={data.team_a + " Vs " + data.team_b}
            icon="access_time"
          />
        </div>
        {/*   <MatchHeader /> */}

        <ContestSortingMenu />

        <div style={style}>
          {contests.length ? (
            contests.map((contest, index) => (
              <Match
                key={index}
                occupied={contest.occupied}
                poolAmount={contest.poolAmount}
                entryFee={contest.entryFee}
                poolSize={contest.poolSize}
                matchId={"87687"}
                matchStatus={contest.status}
                title={contest.title}
              />
            ))
          ) : (
            <span
              style={{
                textAlign: "center",
                marginTop: "40%",
                paddingRight: "0.5rem"
              }}
            >
              {" "}
              {details}
            </span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Contest;
