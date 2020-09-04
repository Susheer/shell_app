import React from "react";
import logo from "../../dst/img/dream11_logo-3.svg";
import Match from "../../reusable-components/iteam-cards";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import urls from "../../config/url.json";
import ServerRoutes from "../../config/routes.json";
const axios = require("axios");

class Home extends React.Component {
  state = {
    dirToContest: false,
    matchList: [],
  };
  matchOnPress = (e) => {
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
            state: this.selectedMatch,
          }}
        />
      );
    }
  }

  componentDidMount() {
    axios
      .get(ServerRoutes.homePg.listMatch)
      .then((response) => {
        // handle success
        console.log("response.data.matches->", response.data.matches);
        this.setState({ matchList: response.data.matches });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
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
                <img src={logo} alt="logo-data" className="logo_32840" />
              </div>
              <div className="headerElement_af700 right_c98d9">
                <div className="js--home-login-btn">
                  <span className="whiteBorderedButton_6b901">Login</span>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                width: "inherit",
              }}
            >
              <Paper square>
                <Tabs
                  value={0}
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
            matchStatus={v.status}
            matchStatusColor={v.status_color}
            flagAColor={v.flag_a_color}
            flagBColor={v.flag_b_color}
            title={v.title}
            teamA={v.team_a}
            teamB={v.team_b}
            flagA={urls.url + v.flag_a}
            flagB={urls.url + v.flag_b}
            time={v.startDate}
            onPress={this.matchOnPress}
          />
        ))}
      </>
    );
  }
}
export { Home };
