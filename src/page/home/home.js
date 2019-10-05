import React from "react";
import logo from "../../dst/img/dream11_logo-3.svg";
import flag1 from "../../dst/img/flags/BBT-CR2@2x.png";
import flag2 from "../../dst/img/flags/BIH-CR1@2x.png";
import Match from "../../reusable-components/iteam-cards";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
class Home extends React.Component {
  state = {
    dirToContest: false,
    matchList: [
      {
        matchStatus: "Strik",
        matchStatusColor: "Red",
        flagAColor: "red",
        flagBColor: "green",
        title: "IPL Series",
        teamA: "IND",
        teamB: "AUS",
        flagA: { flag1 },
        flagB: { flag2 },
        time: "3  Hour"
      },
      {
        matchStatus: "Strik",
        matchStatusColor: "Red",
        flagAColor: "red",
        flagBColor: "green",
        title: "IPL Series",
        teamA: "PAK",
        teamB: "SRI",
        flagA: { flag1 },
        flagB: { flag2 },
        time: "10  Hour"
      },
      {
        matchStatus: "Strik",
        matchStatusColor: "Red",
        flagAColor: "red",
        flagBColor: "green",
        title: "IPL Series",
        teamA: "AFG",
        teamB: "NEZ",
        flagA: { flag1 },
        flagB: { flag2 },
        time: "3  Hour"
      },
      {
        matchStatus: "Strik",
        matchStatusColor: "Red",
        flagAColor: "red",
        flagBColor: "green",
        title: "IPL Series",
        teamA: "AFG",
        teamB: "NEZ",
        flagA: { flag1 },
        flagB: { flag2 },
        time: "3  Hour"
      }
    ]
  };
  matchOnPress = e => {
    let a = e.currentTarget.parentNode.getAttribute("data-key");
    console.log("ok", this.state.matchList[a]);
    this.selectedMatch = { ...this.state.matchList[a] };
    this.setState({ dirToContest: true });
  };

  redirect() {
    if (this.state.dirToContest) {
      return (
        <Redirect
          to={{
            pathname: "/contest",
            state: this.selectedMatch
          }}
        />
      );
    }
  }

  render() {
    return (
      <>
        {this.redirect()}
        <header className="header">
          <div className="Home-header headerFixed">
            <div className="align-center">
              <div className="headerElement_af700"></div>
              <div>
                <div className="headerElement_af700 left_a1d14"></div>
                <img src={logo} className="logo_32840" />
              </div>
              <div className="headerElement_af700 right_c98d9">
                <div className="js--home-login-btn">
                  <a className="whiteBorderedButton_6b901" href="#">
                    Login
                  </a>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                width: "inherit"
              }}
            >
              <Paper square>
                <Tabs
                  value={0}
                  indicatorColor="primary"
                  textColor="primary"
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="CRICKET" />
                  <Tab label="KABADDI" />
                  <Tab label="BASKETBALL" />
                  <Tab label="FOOTBAL" />
                  <Tab label="VOLLEYBALL" />
                </Tabs>
              </Paper>
            </div>
          </div>
        </header>

        {/*  secon compone  */}
        <div className="container" style={{ marginTop: "8rem" }}>
          <div className="title">
            <strong>Upcomming matches</strong>
          </div>
        </div>
        {this.state.matchList.map((v, i) => (
          <Match
            key={i}
            matchId={i}
            matchStatus={v.matchStatus}
            matchStatusColor={v.matchStatusColor}
            flagAColor={v.flagAColor}
            flagBColor={v.flagBColor}
            title={v.title}
            teamA={v.teamA}
            teamB={v.teamB}
            flagA={flag1}
            flagB={flag2}
            time={v.time}
            onPress={this.matchOnPress}
          />
        ))}
      </>
    );
  }
}
export { Home };
