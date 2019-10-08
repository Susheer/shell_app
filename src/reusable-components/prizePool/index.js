import React from "react";
import ItemHeader from "./item-header";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import IFooter from "./item-footer";
const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});
const Item = ({
  title,
  matchStatus,
  matchStatusColor,

  onPress,
  matchId
}) => {
  let className = "card card_iteam darkTheme";
  let classess = useStyles();
  return (
    <div data-key={matchId}>
      <li
        className={className}
        onClick={onPress}
        data-key={matchId}
        style={{ height: "auto", maxHeight: "unset" }}
      >
        <ItemHeader
          title={title}
          matchStatus={matchStatus}
          statusColor={matchStatusColor}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 1rem 1rem 1rem "
          }}
        >
          <div
            className="prize-pool"
            style={{ fontSize: "20px", fontWeight: "500", color: "#282828 " }}
          >
            ₹10 Lakhs
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <button className="new-button smallGreenButton">
                  <span>
                    <span className="rupay-icon">₹</span>
                    <span className="currency-amount">33</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* next row  for bar  */}
        <div
          className="progressBar"
          style={{
            display: "flex",
            width: "inherit",
            padding: "0 1rem 0"
          }}
        >
          <div className={classess.root}>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={60}
            />
          </div>
        </div>

        {/* next row  for pool size  */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2px 1.1rem 0px"
          }}
        >
          <div>
            <p
              style={{
                color: "rgb(222, 115, 153)",
                fontSize: "12px",
                fontWeight: "500"
              }}
            >
              39,726 spots left
            </p>
          </div>
          <div>
            <p
              style={{ color: "#969696", fontSize: "12px", fontWeight: "500" }}
            >
              40,000 spots
            </p>
          </div>
        </div>

        <IFooter />
      </li>
    </div>
  );
};

export default Item;
