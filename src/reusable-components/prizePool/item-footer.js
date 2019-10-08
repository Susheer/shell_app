import React from "react";
import "./footer.css";
import winners_icon from "../../dst/img/Newfolder/winners_icon.svg";
const ItemFooter = ({}) => {
  return (
    <div className=" matchCardFooterDesktop">
      <div className="contestSpec_a3ebb">
        <div className="iconLabelGroup_f55e1">
          <div className="iconLabelWrapper_43690">
            <img
              src={winners_icon}
              style={{ height: "16px", width: " 16px", marginRight: "4px" }}
            />
            <span>88%</span>
          </div>
        </div>
        <div
          className="iconLabelGroup_f55e1"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="squareWithTwoRoundCorner_1291a">C</div>
          <div style={{ paddingLeft: "12px" }}>
            <div className="squareWithTwoRoundCorner_1291a">M</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFooter;
