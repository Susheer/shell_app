import React from "react";
import Timer from "./timer";
const ItemBody = ({
  leftFlagColor,
  leftContryTitle,
  rightFlagColor,
  rightContryTitle,
  flagA,
  flagB,
  time
}) => {
  let lFlagColor = leftFlagColor ? leftFlagColor : "rgb(89, 191, 148)";
  let rFlagColor = rightFlagColor ? rightFlagColor : "rgb(215, 110, 127)";
  return (
    <div className="matchCardMain">
      {/* Team A */}
      <div className="flex">
        {/*   left flag  */}
        <div
          className="flagWrapper flagWrapperLeft flagWrapperDesktop"
          style={{ backgroundColor: lFlagColor }}
        >
          <div className="flagLeftPosition">
            <div
              className="lazy-loader lazyLoader lazyLoaderLoaded"
              style={{ height: "64px", width: "64px" }}
            >
              <img
                src={flagA}
                className="lazyLoaderImg lazyLoaderImgFit lazyLoaderImgLoaded"
              />
            </div>
          </div>
        </div>
        {/*   left contory name */}
        <div className="squadShortName squadShortNameLeft">
          {leftContryTitle}
        </div>
      </div>

      {/* timer goes here */}
      <div className="matchCardTimer matchCardTimerDesktop">
        <Timer time={time} />
      </div>

      {/* Team B */}
      <div className="flex">
        <div className="squadShortName squadShortNameRight">
          {rightContryTitle}
        </div>
        <div
          className="flagWrapper flagWrapperRight flagWrapperDesktop"
          style={{ backgroundColor: rFlagColor }}
        >
          <div className="flagRightPosition">
            <div
              className="lazy-loader lazyLoader lazyLoaderLoaded"
              style={{ height: "64px", width: "64px" }}
            >
              <img
                src={flagB}
                className="lazyLoaderImg lazyLoaderImgFit lazyLoaderImgLoaded"
              />
            </div>
          </div>
        </div>
      </div>
      {/* main end here  */}
    </div>
  );
};

export default ItemBody;
