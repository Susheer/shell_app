import React from "react";
const ItemHeader = ({ title, matchStatus }) => {
  return (
    <div className="matchCardHeader matchCardHeaderDesktop">
      <div className="match-card-header matchCardHeaderTitle matchCardHeaderTitleDesktop">
        {title}
      </div>
      <div className="matchCardHeaderStatus matchCardHeaderTitleDesktop">
        {matchStatus ? (
          <div className="matchCardHeaderTitle matchCardHeaderTitleDesktop">
            <div>{matchStatus}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemHeader;
