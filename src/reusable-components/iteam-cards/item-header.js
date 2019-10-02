import React from "react";
const ItemHeader = ({ title, matchStatus, statusColor }) => {
  let stsColor = statusColor ? statusColor : "rgb(0, 177, 55)";

  let stsColor1 = statusColor ? statusColor : "rgb(0, 177, 55)";
  return (
    <div className="matchCardHeader matchCardHeaderDesktop">
      <div className="match-card-header matchCardHeaderTitle matchCardHeaderTitleDesktop">
        {title}
      </div>
      <div className="matchCardHeaderStatus matchCardHeaderTitleDesktop">
        {matchStatus ? (
          <div className="matchCardHeaderStatusText">
            <div
              className="liveDot"
              style={{ backgroundColor: stsColor }}
            ></div>
            <div style={{ color: stsColor1 }}>{matchStatus}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemHeader;
