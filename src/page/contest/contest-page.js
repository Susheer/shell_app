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
  state = {
    contests: [],

    details: "loading...",
    redirectToPaymentGetway: false
  };

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

  serverCall = data => {
    console.log("data", data);
    axios
      .post(ServerRoutes.contestPg.paymentReq, {
        userId: "sudheergupta@gmail.com",
        itemId: "item003",
        entryFee: data.entryFee
      })
      .then(response => {
        console.log("Payment getway req", response);
        if (response.data.success) {
          this.params = response.data.param;
          this.checksum = response.data.checksum;
          this.txnUrl = response.data.txnUrl;

          // re-render
          this.setState({ redirectToPaymentGetway: true }, () => {
            console.log(
              "redirectToPaymentGetway:true",
              this.state.redirectToPaymentGetway
            );
          });
        } else {
          alert("Server : replied with error");
          console.log("response.data.success", response.data.success);
        }
      })
      .catch(err => {
        console.log("error payment req", err);
      });
  };

  onContestPress = e => {
    let a = e.currentTarget.parentNode.getAttribute("data-key");
    console.log("selected contest", this.state.contests[a]);
    this.selectedContest = { ...this.state.contests[a] };
    this.serverCall(this.selectedContest);
  };

  render() {
    let form_fields = null;
    let formElement = [];
    let data = {};
    if (this.props.location.state) {
      data = this.props.location.state;
    }

    const { contests, details, redirectToPaymentGetway } = this.state;
    if (redirectToPaymentGetway) {
      console.log("Render:Redirecting ...");
      for (let x in this.params) {
        formElement.push(<input type="text" name={x} value={this.params[x]} />);
      }
      formElement.push(
        <input type="text" name="CHECKSUMHASH" value={this.checksum} />
      );
    }
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
        {this.state.redirectToPaymentGetway ? (
          <form action={this.txnUrl} name="f1">
            {formElement}
          </form>
        ) : (
          <div style={style}>
            {contests.length ? (
              contests.map((contest, index) => (
                <Match
                  key={index}
                  occupied={contest.occupied}
                  poolAmount={contest.poolAmount}
                  entryFee={contest.entryFee}
                  poolSize={contest.poolSize}
                  matchId={index}
                  matchStatus={contest.status}
                  title={contest.title}
                  onPress={this.onContestPress}
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
        )}
      </React.Fragment>
    );
  }

  componentDidUpdate() {
    const { redirectToPaymentGetway } = this.state;
    if (redirectToPaymentGetway) {
      document.f1.submit();
    }
  }
}

export default Contest;
