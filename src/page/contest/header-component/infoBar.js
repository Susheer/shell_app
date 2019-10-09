import React from "react";
import { Link } from "react-router-dom";
import "./infoBar.css";
import Timer from "../../../reusable-components/timer";
//timerData={"04h 00m 10s"}
//leftContent={"TKR vs GUY"}
//icon="access_time"
const InfoBar = ({ center, left, icon }) => {
  return (
    <div className="info-bar theam-default  infobar ">
      <div className="infobarContent">
        <InfoBarBody timerData={center} leftContent={left} icon={icon} />
      </div>
    </div>
  );
};

export { InfoBar };

const InfoBarBody = ({ leftContent, timerData, icon }) => {
  return (
    <div className="infobarContentRow">
      <div className="infobarContentLeft">{leftContent}</div>
      <div className="infobarContentCenter">
        <div className="infobar-timer">
          <i
            className="materialIcon"
            style={{
              height: "16px",
              width: " 16px",
              fontSize: "16px"
            }}
          >
            {icon}
          </i>
          <span className="timeRemaining">
            <div className="timer">
              <Timer time={timerData} />
            </div>
          </span>
        </div>
      </div>
      <div className="infobar-rule infobarContentRight">
        <Link className="floatingAnchorButton_fac02" to="/">
          RULES
        </Link>
      </div>
    </div>
  );
};
